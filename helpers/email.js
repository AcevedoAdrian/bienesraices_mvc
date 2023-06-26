import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { nombre, email, token } = datos;
  //enviar email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirma tu cuneta en BienesRaicies.com",
    text: "Confirma tu cuneta en BienesRaicies.com",
    html: `
    <p>Hola <b>${nombre}</b>, comprueba tu cuenta en bienesRaices.com</p>
        <p>Tu cuenta ya esta lista, solo debes confirmmarla en el siguiente enlace: 
          <a 
          href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">
            Confirmar Cuenta
          </a>
        </p>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { nombre, email, token } = datos;
  //enviar email
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Restablece tu password en BienesRaicies.com",
    text: "Restablece tu password en BienesRaicies.com",
    html: `
    <p>Hola <b>${nombre}</b>, has solicitado reestablecer tu passwoed en bienesRaices.com</p>
        <p>Sigue el siguiente para generar un password nuevo: 
          <a 
          href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/olvide-password/${token}">
            Reestablecer Password
          </a>
        </p>
        <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
    `,
  });
};

export { emailRegistro, emailOlvidePassword };
