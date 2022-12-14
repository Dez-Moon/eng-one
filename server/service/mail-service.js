const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Регистрация на сайте ${process.env.CLIENT_URL}`,
      text: "",
      html: `
            <div>
                <h1>Для активации аккаунта перейдите по <a href=${link}>ссылке</a></h1>
            </div>
            `,
    });
  }
  async getPasswordRecoveryCode(to, code) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Восстановление пароля на ${process.env.CLIENT_URL}`,
      text: "",
      html: `
            <div>
                <h1>Код для восстановления пароля: ${code}</h1>
            </div>
            `,
    });
  }
}

module.exports = new MailService();
