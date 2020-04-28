const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const twClient = require('twilio')(config.accountSid, config.authToken)
const twiml = require('twilio').twiml.MessagingResponse

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

const getOpted = () => {
    return new Promise((resolve,reject) => {
        twClient.messages.list({
            to: 'whatsapp:+14155238886',
        })
        .then(res => resolve([... new Set(res.filter(i => i.body.match(/join/gi)).map(i => i.from))]))
        .catch(e => reject(e))
    })
}

app.post('/whatsApp', (req,res) => {
    console.log(req.body)
    const msg = new twiml
    msg.message('You Opted For Remainders. Reply Stop to Opt out.')
    res.send(msg.toString())
})

setInterval(() => {
    getOpted()
    .then(res => {
        console.log(res)
        res.forEach(i => {
            twClient.messages.create({
                body: 'Wash Hands\nSTAY Home\nWear Mask\nKEEP a safe distance\nCOVER your cough\nReply stop to Opt Out',
                from: 'whatsapp:+14155238886',
                to: i
            }).then(res => console.log(`Posted - ${i}`))
            .catch(e => console.log(`Post Error - ${i}`))
        })
    })
    .catch(e => console.log('Error --Get Opted'))
}, 5000)

app.listen(port, () => console.log(`Running on PORT:${port}`))