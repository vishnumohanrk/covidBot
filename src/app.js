const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const twClient = require('twilio')(config.accountSid, config.authToken)
const twiml = require('twilio').twiml.MessagingResponse

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    console.log(req.body)
    const msg = new twiml
    msg.message('Hello')
    res.end(msg.toString())
    // setInterval(() => res.write(
    //     `Remember To Wash Hands,
    //     Always Wear Masks While going Out
    //     Social Distancing,
    //     `
    // ), 1000)
})

app.listen(port, () => console.log(`Running on PORT:${port}`))