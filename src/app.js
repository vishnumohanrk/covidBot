const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const twClient = require('twilio')(config.accountSid, config.authToken)
const twiml = require('twilio').twiml.MessagingResponse

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    
})

setInterval(() => {
    arr.forEach(i => {
        twClient.messages.create({
            body: 'Remember To Wash Hands,\nAlways Wear Masks While going Out\nSocial Distancing',
            from: 'whatsapp:+14155238886',
            to: i
        }).then(res => console.log(`Posted - ${i}`))
        .catch(e => console.log(`Post Error - ${i}`))
    })
}, 120000)

app.listen(port, () => console.log(`Running on PORT:${port}`))