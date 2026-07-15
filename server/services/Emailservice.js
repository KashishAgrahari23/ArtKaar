import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

class EmailService {
  async sendMail({ to, subject, html }) {
    await transporter.sendMail({
      from: `"Artkaar" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    return true;
  }
}

export default new EmailService();