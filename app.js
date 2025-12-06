import express from 'express'
import cors from 'cors'
const app = express()
const port = 3000

let data = {}
let currID = '0'

app.use(cors({
    origin : 'http://localhost:5173'
}))
app.use(express.json())

app.post('/save', (req, res) => {
    let {Id, emo, color} = req.body
    currID = Id
    console.log(currID)
    let emotion = emo
    let co = color
    let currData= {[Id] : {"emotion" : emotion, "color" : co}}
    data = { ...data, ...currData}
    res.json({ok : true})
})

app.get('/save', (req, res) => {
    res.json({
        ID : currID,
        Emotions : data
    })
})

app.get('/currid', (req, res) => {
    res.json({currID})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

