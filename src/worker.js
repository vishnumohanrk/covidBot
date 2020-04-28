const config = require('./config')
const twClient = require('twilio')(config.accountSid, config.authToken)

const getOpted = () => {
    return new Promise((resolve,reject) => {
        twClient.messages.list({
            to: 'whatsapp:+14155238886',
        })
        .then(res => resolve([... new Set(res.filter(i => i.body.match(/join/gi)).map(i => i.from))]))
        .catch(e => reject(e))
    })
}

setInterval(() => {
    getOpted()
    .then(res => {
        console.log(res)
        res.forEach(i => {
            twClient.messages.create({
                body: 'Gentle Remainder\nWash Hands\nSTAY Home\nWear Mask\nKEEP a safe distance\nCOVER your cough\nReply stop to Opt Out',
                from: 'whatsapp:+14155238886',
                to: i
            }).then(res => console.log(`Posted - ${i}`))
            .catch(e => console.log(`Post Error - ${i}`))
        })
    })
    .catch(e => console.log('Error --Get Opted'))
}, 1800000)