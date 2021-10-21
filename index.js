const nodemailer = require('nodemailer');
const fs = require('fs');
const senderInfo = require('./config/sender-info.json');

const config = {
  options: {
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    to: 'throw@cttd.co.kr, throw111@naver.com, throw2126@gmail.com, cttd08@gepplus.co.kr',
    subject: 'Sending Email using node.js'
  }
};

// const transporter = nodemailer.createTransport({
//   service: config.options.service,
//   host: config.options.host,
//   port: config.options.port,
//   auth: {
//     user: senderInfo.user, // 본인 메일 계정
//     pass: senderInfo.pass // 본인 메일 패스워드
//   }
// });

// fs.readFile('output.html', {encoding: 'utf-8'}, function(err, html) {
//   if (err) {
//     console.log(err);
//   } else {
//     let mailOption = {
//       from: senderInfo.user,
//       to: config.options.to,
//       subject: config.options.subject,
//       html: html
//     };

//     transporter.sendMail(mailOption, function(error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(`Email sent: ${info.response}`);
//       }
//     });
//   }
// });

async function main() {
  let transporter = nodemailer.createTransport({
    service: config.options.service,
    host: config.options.host,
    port: config.options.port,
    auth: {
      user: senderInfo.user, // 본인 메일 계정
      pass: senderInfo.pass // 본인 메일 패스워드
    }
  });

  let info = await transporter.sendMail({
    from: senderInfo.user,
    to: config.options.to,
    subject: config.options.subject,
    text: 'hello world?',
    html: "<b>hello world</b>"
  });

  console.log(info.messageId);
  console.log(nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);