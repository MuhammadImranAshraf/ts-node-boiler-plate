import nodemailer from "nodemailer";
import config from "config";
import Handlebars from "handlebars";

const { readFile } = require("fs").promises;

const smtpTransport = nodemailer.createTransport({
  pool: true,
  host: config.get("nodemailer.host"),
  port: config.get("nodemailer.port"),
  secure: true,
  auth: {
    user: config.get("nodemailer.user"),
    pass: config.get("nodemailer.password"),
  },
});
const sendMail = (options: any) =>
  new Promise((resolve) =>
    smtpTransport.sendMail(options, (error: any, info: any) =>
      resolve([error, info])
    )
  );

const sendEmail = async (payload: any) => {
  try {
    let template_path: string;
    const { user, template, extraData } = payload;
    let subject: string;
    let email: string;
    let replacements: any = {};

    switch (template) {
      case "send-otp":
        template_path = `./src/v1/public/emails/send-otp.html`;
        subject = "Password update request";
        email = user.email;
        replacements = {
          userName: `${user.fullName} `,
          otp: extraData.otp,
        };
        break;
      case "password-reset":
        template_path = `./src/v1/public/emails/password-reset.html`;
        subject = "Password Change";
        email = user.email;
        replacements = {
          userName: `${user.fullName}`,
          supportEmail: "no-reply@himonk.com",
        };
        break;
      case "welcome":
        template_path = `./src/v1/public/emails/welcome.html`;
        subject = "Welcome to Himonk";
        email = user.email;
        replacements = {
          userName: `${user.fullName}`,
        };
        break;

      default:
        console.log(`missing email template ${template}`);
        return;
    }

    const html = await readFile(template_path, { encoding: "utf-8" });
    const HbsTemplate = Handlebars.compile(html);
    const htmlToSend = HbsTemplate(replacements);
    const mailOptions = {
      from: `Himonk <${config.get("nodemailer.user")}>`,
      to: email,
      subject,
      html: htmlToSend,
    };

    let [err, info]: any = await sendMail(mailOptions);

    if (err) throw err;

    console.log("Email sent to:  " + mailOptions.to + " " + info.response);
  } catch (error) {
    console.log("Email Error!", error);
  }
};

export default sendEmail;
