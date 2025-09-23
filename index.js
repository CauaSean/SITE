console.log("Servidor Node iniciado com sucesso!");

require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


app.post('/send-email', async (req, res) => {
  const { emissor, assunto, mensagem } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'sendemailsender@gmail.com',
    subject: assunto,
    text: `Mensagem de: ${emissor}\n\n${mensagem}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado com sucesso:', info.response);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).send('Erro ao enviar email');
  }
});


app.listen(5500, () => {
  console.log('Servidor rodando em http://localhost:5500');
});
