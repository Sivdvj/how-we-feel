import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "postgres",
	password: "postgres",
	database: "postgres",
});

const app = express();
const port = 3000;

app.use(
	cors({
		origin: process.env.FRONTEND_URL,
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());

app.post("/signin", async (req, res) => {
	let { firstname, username, password } = req.body;
	if (!username || !password || !firstname) {
		return res.status(400).json({ error: "Missing fields" });
	}

	let hashedPassword = await bcrypt.hash(password, 10);

	try {
		await pool.query(`INSERT INTO users (username, password, name) VALUES ($1, $2, $3)`, [username, hashedPassword, firstname]);
		res.json({ ok: true });
	} catch (err) {
		return res.status(400).json({ error: "Username already exits" });
	}
});

app.post("/login", async (req, res) => {
	let { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ error: "Missing fields" });
	}

	let result = await pool.query(`SELECT id, password FROM users WHERE username = $1`, [username]);

	if (result.rowCount === 0) {
		return res.status(400).json({ error: "Username does not exist" });
	}

	let userData = result.rows[0];
	let match = await bcrypt.compare(password, userData.password);
	if (!match) {
		return res.status(400).json({ error: "Invalid Password" });
	}

	let client = await pool.connect();
	let sid;
	try {
		await client.query("BEGIN");

		await client.query(`SELECT 1 FROM sessions WHERE user_id = $1 FOR UPDATE`, [userData.id]);
		let tokenGen = await client.query(`SELECT COALESCE(MAX(token), 0) + 1 as next_token FROM sessions WHERE user_id = $1`, [userData.id]);
		let token = tokenGen.rows[0].next_token;
		sid = crypto.randomUUID();

		await client.query("INSERT into sessions (user_id, token, session_id, user_agent) VALUES ($1, $2, $3, $4)", [userData.id, token, sid, req.headers["user-agent"]]);
		await client.query("COMMIT");
	} catch (e) {
		await client.query("ROLLBACK");
	} finally {
		client.release();
	}
	console.log(sid);

	res.cookie("Sid", sid, {
		httpOnly: true,
		secure: process.env.FRONTEND_URL.startsWith("https"),
		sameSite: "lax",
	});
	res.json({ ok: true });
});

app.use(async (req, res, next) => {
	let sid = req.cookies.Sid;
	if (!sid) return res.status(401).json({ error: "Unauthorized" });

	let resp = await pool.query(`SELECT user_id, token FROM sessions WHERE session_id = $1`, [sid]);
	if (resp.rowCount === 0) return res.status(401).json({ error: "Unauthorized" });

	req.userID = resp.rows[0].user_id;
	req.token = resp.rows[0].token;
	next();
});

app.post("/save", async (req, res) => {
	let { Id, emo, color } = req.body;

	await pool.query(`INSERT INTO emotions (user_id, emotion_id, emotion, color) VALUES ($1, $2, $3, $4)`, [req.userID, Id, emo, color]);
	res.json({ ok: true });
});

app.post("/data", async (req, res) => {
	let dataFetch = await pool.query(`SELECT emotion_id, emotion, color FROM emotions WHERE user_id = $1 ORDER BY emotion_id`, [req.userID]);
	let emotions = {};
	let max_id = 0;
	dataFetch.rows.forEach((row) => {
		emotions[row.emotion_id] = {
			emotion: row.emotion,
			color: row.color,
		};
		max_id = Math.max(max_id, row.emotion_id);
	});
	res.json({ Emotion: emotions, ID: max_id });
});

app.post("/logout", async (req, res) => {
	await pool.query(`DELETE FROM sessions WHERE user_id = $1 AND token = $2`, [req.userID, req.token]);
	res.clearCookie("Sid");
	res.json({ ok: true });
});

app.post("/sessions", async (req, res) => {
	let currentSession = await pool.query(`SELECT session_id, user_agent, created_at FROM sessions WHERE user_id = $1 AND token = $2`, [req.userID, req.token]);
	let sessionResult = await pool.query(`SELECT session_id, user_agent, created_at FROM sessions WHERE user_id = $1`, [req.userID]);
	let list = {};
	sessionResult.rows.forEach((row) => {
		list[row.session_id] = {
			userAgent: row.user_agent,
			createdAt: row.created_at,
			isCurrent: false,
		};
	});
	if (currentSession.rows.length > 0) {
		let curr = currentSession.rows[0];
		list[curr.session_id] = {
			userAgent: curr.user_agent,
			createdAt: curr.created_at,
			isCurrent: true,
		};
	}
	res.json({ ok: true, list });
});

app.post("/revoke", async (req, res) => {
	let { token } = req.body;
	if (token <= req.token) return res.status(401).json({ error: "Forbidden" });
	await pool.query(`DELETE FROM sessions WHERE token = $1 AND user_id = $2`, [token, req.userID]);
	res.json({ ok: true });
});

app.post("/revokeAll", async (req, res) => {
	await pool.query(`DELETE FROM sessions WHERE user_id = $1 AND token > $2`, [req.userID, req.token]);
	res.json({ ok: true });
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
