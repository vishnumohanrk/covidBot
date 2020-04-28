const express = require('express')
const bodyParser = require('body-parser')
const twiml = require('twilio').twiml.MessagingResponse
const commands = require('./commands')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    const msg = new twiml
    commands.returnRes(req.body.Body)
    .then(data => {
        msg.message(data)
        res.send(msg.toString())
    })
    .catch(e => console.log(e))
})

app.listen(port, () => console.log(`Running on PORT:${port}`))