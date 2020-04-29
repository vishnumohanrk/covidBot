const express = require('express')
const bodyParser = require('body-parser')
const twiml = require('twilio').twiml.MessagingResponse
const commands = require('./commands')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    commands.returnRes(req.body.Body)
    .then(data => {
        if(data.length > 1600){
            const msg1 = new twiml
            msg1.message(data.split(',').slice(0,20).toString())
            res.send(msg1.toString())
            return res.end()
        }
        const msg = new twiml
        msg.message(data)
        res.send(msg.toString())
    })
    .catch(e => console.log(e))
})

app.listen(port, () => console.log(`Running on PORT:${port}`))