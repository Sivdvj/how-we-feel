import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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

app.post('/signin', (req, res) => {
    let {firstname, username, password} = req.body
    if(!username || !password){
        return res.status(401).json({error : 'Missing fields'})
    }
    if(users[username]){
        return res.status(401).json({error : 'Username already exists'})
    }

    users[username] = {
        Name : firstname,
        Password : password
    }

    userdata[username] = {
        ID : 0,
        Emotion : {}
    }

    res.json({ok : true})
})

app.post('/login', (req, res) => {
    let {username, password} = req.body
    if(!username || !password){
        return res.status(401).json({error : 'Missing fields'})
    }
    if(!users[username]){
        return res.status(401).json({error : 'Username does not exist'})
    }
    if(users[username].Password != password){
        return res.status(401).json({error : 'Invalid Password'})
    }
    let sid = crypto.randomUUID();
    console.log(sid)
    session[sid] = username
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
    req.username = session[Sid]
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

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

