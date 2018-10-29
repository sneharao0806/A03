const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser') // simplifies access to request body
const app = express()  // make express app
const port = process.env.PORT || 8081
const logfile = '/access.log'

// Automatic mailing
const fs = require('fs')
const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 include public assets and use bodyParser
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request
// 6 respond with 404 if a bad URI is requested

console.log(process.env);

// 1 set up the view engine
app.set('views', path.resolve(__dirname, 'views')) // path to views
app.set('view engine', 'ejs') // specify our view engine

// 2 include public assets and use bodyParser
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
var accessLogStream = fs.createWriteStream(path.join(__dirname, logfile), { flags: 'a' })
app.use(logger('dev'))
app.use(logger('combined', { stream: accessLogStream }))


// 4 http GET default page at /
app.get('/', function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render('index.ejs')
})

// 4 http GET /tic-tac-toe
app.get('/game', function (req, res) {
  res.render('game.ejs')
})

// 4 http GET /about

app.get('/index', function (req, res) {
  res.render('index.ejs')
})
// 4 http GET /contact
app.get('/contact', function (req, res) {
  res.render('contact.ejs')
})

// 5 http POST /contact
app.post('/contact', function (req, res) {
  const name = req.body.inputname
  const email = req.body.inputemail
  const company = req.body.inputcompany
  const comment = req.body.inputcomment
  const isError = false

  // logs to the terminal window (not the browser)
  const s = '\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + company + ' ' + comment + '\n'
  console.log(s)

  const mailOptions = {
    from: 'sneha madhavaram <sneharao0806@gmail.com>', // sender address
    to: 's533984@nwmissouri.edu, sneharao0806@gmail.com', // list of receivers
    subject: 'Message from Website Contact page', // Subject line
    text: s,
    err: isError
  }

  try {
    const auth = require('./config.json')
    // create transporter object capable of sending email using the default SMTP transport
    const transporter = nodemailer.createTransport(mg(auth))

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('\nERROR: ' + error + '\n')
        res.render('contact-error.ejs')
      } else {
        console.log('Sending email...')
        if (info) { console.log('\nres SENT: ' + info.res + '\n') }
        res.render('contact-confirm.ejs')
      }
    })
  }
  catch (e) {
    console.log(e.message)
    res.render('contact-error.ejs')
  }
})

// 6 this will execute for all unknown URIs not specifically handled
app.get(function (req, res) {
  res.render('404')
})

// Listen for an application request on designated port
app.listen(port, function () {
  console.log('\nWeb app started and listening on http://localhost:' + port + '.')
  console.log('\nLogs will be sent to this terminal and ' + logfile + '.')
  console.log('\nKeep this open while serving, and use CTRL-C to quit.')
})
