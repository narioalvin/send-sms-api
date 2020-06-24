const express = require('express');
const cors = require('cors');
const Nexmo = require('nexmo');
const { messageValidation } = require('./validation');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/send', (req, res) => {
  const { error } = messageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const nexmo = new Nexmo({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });

  const from = req.body.from;
  const to = req.body.number;
  const text = req.body.message;

  nexmo.message.sendSms(from, to, text);

  res.send('success');
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running in port ${port}`));
