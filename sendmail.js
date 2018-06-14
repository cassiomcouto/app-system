'use strict';
const nodemailer = require('nodemailer');


const exec = require('child_process').exec;


const testscript = exec('sudo bash log/infoAccess.sh');

testscript.stdout.on('data', function(data){


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "cassiomcouto@gmail.com", // generated ethereal user
            pass: "tiyrhiqarsxcnszp" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'cassiomcouto@gmail.com', // sender address
        to: 'contato@opsrastreamento.com.br', // list of receivers
        subject: `Total de Requisições: ${data} /server.js 200`, // Subtiect line
        text: "Mensagem", // plain text body
        html: `<b>Total de Requisições ${data} /server.js 200 </b>` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});
});
    