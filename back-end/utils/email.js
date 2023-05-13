const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.firstName = user.name;
    this.from = `WASSELNI <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject, text) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const subject = "Welcome to the WASSELNI Family!";
    const text = `Dear ${this.firstName},\n\nWelcome to the WASSELNI Family! Please click on the following link to get started:\n${this.url}\n\nBest regards,\nWASSELNI Team`;
    await this.send(subject, text);
  }

  async sendPasswordReset() {
    const subject = "Your password reset token (valid for only 10 minutes)";
    const text = `Dear ${this.firstName},\n\nYou have requested to reset your password. Please click on the following link to reset it (valid for only 10 minutes):\n${this.url}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nWASSELNI Team`;
    await this.send(subject, text);
  }
};
