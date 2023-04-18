const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const hbs = require("nodemailer-express-handlebars");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true}));

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: "philipowolabi79@gmail.com",
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.post("/", (req, res) => {
  console.log("New request", req.body)
  const {subject, message} = req.body
  let mailOptions = {
    from: "philipowolabi79@gmail.com",
    to: "philipowolabi79@gmail.com",
    subject,
    text: message,
    template: "template",
    context: {
      body: req.body,
    },
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return res.json({
        message: "An error occured, please try again.",
        status: 500,
      });
    } else {
      console.log("Email sent: " + info.response);
      return res.json({
        message: "Information submitted successfully.",
        status: 200,
      });
    }
  });
});
