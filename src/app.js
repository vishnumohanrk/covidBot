const express = require('express')
const bodyParser = require('body-parser')
const twiml = require('twilio').twiml.MessagingResponse
const utils = require('./utils/req')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
const port = process.env.PORT || 3000

app.post('/whatsApp', (req,res) => {
    const msg = new twiml
    const q = req.body.Body
    console.log(q)
    if(q.toLowerCase() === 'commands'){
        msg.message('State Name or State Code to see that state stats.')
        return res.send(msg.toString())
    } else if(q){
        utils.getStateStats(q)
        .then(data => {
            console.log(data)
            const x = !data[0] ? `Check Query\nTo see Available Commands - Reply 'Commands'` : `State: ${data[0].state}\nAS OF ${data[0].lastupdatedtime}\nRECOVERED: ${data[0].recovered}\nACTIVE: ${data[0].active}\nCONFIRMED: ${data[0].confirmed}\n`
            msg.message(x)
            return res.send(msg.toString())
        })
        .catch(e => console.log(e))
    }
})

app.listen(port, () => console.log(`Running on PORT:${port}`))