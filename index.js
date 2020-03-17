var express = require("express"),
    app=express(),
    bodyParser = require("body-parser"),
	mongoose= require("mongoose");

const nodemailer = require("nodemailer"),
      exphbs = require("express-handlebars"),
      path=require("path");

app.set("view engine","ejs");
app.engine("handlebars",exphbs({defaultLayout:'main'}));
app.set("view engine","handlebars");
app.use(express.static("public"));
app.use("/public",express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//defining static folders
// __dirname is current directory


app.get('/',(req,res)=> {
	res.render("landing.ejs");
});
app.get('/home',(req,res)=> {
	res.render("landing.ejs");
});

app.get('/services',(req,res)=> {
	res.render("goldmine.ejs");
});
app.get('/aboutUs',(req,res)=> {
	res.render("team.ejs");
});
app.get('/contactUs',(req,res)=> {
	res.render("contact.ejs",{msg:''});
});
app.post('/send',(req,res) => {
	// console.log(req.body);
   const output =`<p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name : ${req.body.name}</li>
      <li>Email : ${req.body.email}</li>
      <li>Subject : ${req.body.subject}</li>

    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: 'marwakamel061@gmail.com', //Gmail username
            pass: '1477412m' // Gmail password
        },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'contact <test@artisansweb.net>', // sender address
      to: 'merokamel158@gmail.com', // list of receivers
      subject: 'Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact.ejs', {msg:'Email has been sent'});
  });
  });

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))