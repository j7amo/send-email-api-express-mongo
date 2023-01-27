require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { StatusCodes } = require('http-status-codes');
const nodemailer = require('nodemailer');

// We set up EMAIL SENDING with ETHEREAL service.
// Ethereal is a free e-mail catching service, mostly aimed at (but not limited to)
// Nodemailer users. Configure Ethereal as an outbound SMTP service and start sending mail.
// Nothing is actually delivered, all emails are caught and stored for review.
// Messages are stored for few hours and then deleted
// To see received/sent messages navigate to "https://ethereal.email/messages"
// So basically this is just for the development purpose.
// eslint-disable-next-line no-unused-vars
const sendEmailEthereal = async (req, res) => {
  // 1) create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    // if we decide to use popular email service such as Gmail
    // then we need to provide real creds here (via .env file of course)
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'furman75@ethereal.email',
      pass: 'Qy3Gnyr1zfDGFDtPnj',
    },
  });

  // 2) send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Jackie Chan" <lalala@gmail.com>', // sender address
    to: 'booboo@poopoo.com', // list of receivers
    subject: 'Hello!', // Subject line
    // text: 'Hello to myself', // plain text body
    html: '<b>Sending email with NodeJS</b>', // html body
  });

  res.status(StatusCodes.OK).json(info);
};

// If we want to send EMAIL FOR REAL we can use multiple services.
// For example, we can use SendGrid service.
const sendEmail = async (req, res) => {
  // to use it we need to import the package and set the API key (which we get on registration)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // then create an object with these fields:
  const msg = {
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: 'Sending with SendGrid is Fun',
    text: 'Test 2',
    html: '<strong>One more test</strong>',
  };

  let result;

  try {
    result = await sgMail.send(msg);
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  res.status(StatusCodes.OK).json(result);
};

module.exports = sendEmail;
