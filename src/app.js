const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const twiml = require('twilio').twiml.MessagingResponse

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    console.log(req.body)
    const msg = new twiml
    msg.message('You Opted For Remainders. Reply Stop to Opt out.')
    res.send(msg.toString())
})

app.listen(port, () => console.log(`Running on PORT:${port}`))