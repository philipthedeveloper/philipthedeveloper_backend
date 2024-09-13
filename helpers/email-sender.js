import nodemailer from "nodemailer";
import { config } from "dotenv";
import CustomError from "../errors/CustomError.js";
import path from "path";
import hbs from "nodemailer-express-handlebars";

config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  //   port: 465,
  // requireTLS: true,
  // secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SMTPPASS,
  },
});

let options = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(options));

export const sendEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject(new CustomError("Error occured. Please try again"));
      } else {
        console.log("Email sent: " + info.response);
        // return true;
        resolve(info.response);
      }
    });
  });
};

export const sendContactEmail = async (data) => {
  let mailOptions = {
    from: `${data.name} <${data.email}>`,
    to: "philipowolabi79@gmail.com",
    subject: data.subject,
    template: "contact",
    text: data.message,
    context: {
      body: data,
    },
  };
  return sendEmail(mailOptions);
};

export default sendEmail;
