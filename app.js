import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'

const app = express()
const port = 3000

let session = {}
let users = {}
let userdata = {}

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

app.post('/signin', async (req, res) => {
    let {firstname, username, password} = req.body
    if(!username || !password){
        return res.status(401).json({error : 'Missing fields'})
    }
    if(users[username]){
        return res.status(401).json({error : 'Username already exists'})
    }

    let hashedPassword = await bcrypt.hash(password, 10)
    users[username] = {
        Name : firstname,
        Password : hashedPassword
    }

    userdata[username] = {
        ID : 0,
        Emotion : {}
    }

    res.json({ok : true})
})

app.post('/login', async (req, res) => {
    let {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({error : 'Missing fields'})
    }
    if(!users[username]){
        return res.status(401).json({error : 'Username does not exist'})
    }
    
    let match = await bcrypt.compare(password, users[username].Password)
    if(!match){
        return res.status(401).json({error : 'Invalid Password'})
    }
    let sid = crypto.randomUUID();
    console.log(sid)
    session[sid] = {
        Username: username,
        createdAt: Date.now(),
        userAgent: req.headers['user-agent']
    }
    console.log(session[sid])
    res.cookie("Sid", sid, {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    })
    res.json({ok : true})
})

app.use((req, res, next) => {
    let Sid = req.cookies.Sid
    if(!Sid || !session[Sid]) return res.status(401).json({error : 'Unauthorized'})
    req.username = session[Sid].Username
    next()
})

app.post('/save', (req, res) => {
    let {Id, emo, color} = req.body
    userdata[req.username].ID = Id
    userdata[req.username].Emotion[Id] = {"emotion" : emo, "color" : color}
    res.json({ok : true})
})

app.post('/data', (req, res) => {
    res.json(userdata[req.username])
})

app.post('/logout', (req, res) => {
    let Sid = req.cookies.Sid
    delete session[Sid]
    res.clearCookie('Sid')
    res.json({ok : true})    
})

app.post('/sessions', (req, res) => {
    let list = []
    for(let i in session){
        if(session[i].Username === req.username)
            list.push({Sid : i, ...session[i]})
    }
    res.json({ok : true, list})
})

app.post('/revoke', (req, res) => {
    let {Sid} = req.body
    if(session[Sid].Username !== req.username){
        return res.status(401).json({error : "Unauthorized"})
    }
    delete session[Sid]
    res.json({ok : true})

})

app.post('/revokeAll', (req, res) => {
    let currSid = req.cookies.Sid
    for(let i in session){
        if(session[i].Username === req.username && i != currSid){
            delete session[i]
        }
    }
    res.json({ok : true})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

