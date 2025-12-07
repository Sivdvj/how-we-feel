import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

let data = {}
let currID = '0'
let session = {}
let users = {}
let userdata = {}

function randomString(){
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let length = 10
    let chl = characters.length
    for(let i = 0; i < length; i++){
        result += characters.charAt(Math.floor(Math.random() * chl))
    }
    return result
}

app.use(cors({
    origin : 'http://localhost:5173'
}))
app.use(express.json())

app.post('/signin', (req, res) => {
    let {firstname, username, password} = req.body
    if(!username || !password){
        return res.json({error : 'Missing fields'})
    }
    if(users[username]){
        return res.json({error : 'Username already exists'})
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
        return res.json({error : 'Missing fields'})
    }
    if(!users[username]){
        return res.json({error : 'Username does not exist'})
    }
    if(users[username].Password != password){
        return res.json({error : 'Invalid Password'})
    }
    let sid = randomString()
    session[sid] = username
    res.json({Sid: sid, ok : true})
})

app.post('/save', (req, res) => {
    let {Sid, Id, emo, color} = req.body
    if(!session[Sid]) res.json({error: 'Unauthorized'})
    let username = session[Sid]
    userdata[username].ID = Id
    userdata[username].Emotion[Id] = {"emotion" : emo, "color" : color}
    res.json({ok : true})
})

app.post('/emotions', (req, res) => {
    let {Sid} = req.body
    if(!session[Sid]) res.json({error: 'Unauthorized'})
    let username = session[Sid]
    res.json(userdata[username].Emotion)
})

app.post('/currid', (req, res) => {
    let {Sid} = req.body
    if(!session[Sid]) res.json({error: 'Unauthorized'})
    let username = session[Sid]
    res.json(userdata[username].ID)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

