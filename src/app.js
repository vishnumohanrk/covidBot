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
    if(q){
        console.log(q)
        utils.getStateStats()
        .then(data => {
            console.log(data)
            const x = !data[0] ? `Check Query\nTo see Available Commands - Reply 'Commands'` : `State: ${data.state}\nAS OF ${data.lastupdatedtime}\nRECOVERED: ${data.recovered}\nACTIVE: ${data.active}\nCONFIRMED: ${data.confirmed}\nDataBase Reference: https://api.covid19india.org/`
            msg.message(x)
            return res.send(msg)
        })
        .catch(e => console.log(e))
    } else if (q.toLowerCase() === 'commands') {
        msg.message('State Name or State Code to see that state stats.')
    }
})

app.listen(port, () => console.log(`Running on PORT:${port}`))