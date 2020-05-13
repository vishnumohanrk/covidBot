const express = require('express');
const bodyParser = require('body-parser');
const twiml = require('twilio').twiml.MessagingResponse;
const commands = require('./commands');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/whatsApp', async (req, res) => {
    const data = await commands.returnResponse(req.body.Body);

    if (data.toString().length > 1600) {
        const msg1 = new twiml();
        msg1.message(data.slice(0, 20).toString());
        return res.send(msg1.toString());
    }

    const msg = new twiml();
    msg.message(data.toString());
    return res.send(msg.toString());
});

app.listen(port, () => console.log(`Running on PORT:${port}`));
