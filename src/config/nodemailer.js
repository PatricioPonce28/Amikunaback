import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()


let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_APP_PASSWORD  
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendMailToRegister = (userMail, token) => {

    let mailOptions = {
        from: 'admin@epn.edu.ec',
        to: userMail,
        subject: " ❤️🔥 AmiKuna 🔥 ❤️",
        html: `<p>Hola, haz clic <a href="${process.env.URL_BACKEND}confirmar/${token}">aquí</a> para confirmar tu cuenta.</p>
        <hr>
        <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
        `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
        }
    })
}

export default sendMailToRegister