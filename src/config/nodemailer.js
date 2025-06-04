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

const sendMailToRecoveryPassword = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: 'admin@epn.edu.ec',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>" ❤️🔥 AmiKuna 🔥 ❤️"</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperarpassword/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>El equipo de AmiKuna te da la más cordial bienvenida.</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

export {
    sendMailToRegister,
    sendMailToRecoveryPassword
}