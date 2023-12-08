const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

module.exports = async (email, subject, text) => {
  try {
    // Tạo transporter
    const transporter = nodemailer.createTransport({
      host: "stmp.gmail.com",
      service: "gmail",
      port: "587",
      secure: Boolean(true),
      auth: {
        user: "truongthien2411@gmail.com",
        pass: "itjq sszg lrnc xefc",
      },
    });

    // Read the HTML template
    const source = fs.readFileSync(__dirname + "/emailTemplate.hbs", "utf8");
    const template = handlebars.compile(source);

    // Replace placeholders in the template
    const html = template({ password: text, email: email });

    // Send the email
    await transporter.sendMail({
      from: "📚 BLACK&CAT STORE",
      to: email,
      subject: subject,
      text: "Confirm to register account",
      html: html,
      attachments: [
        {
          filename: "logo.png",
          path: `${__dirname}/image/nike-logo.png`,
          cid: "logo",
        },
      ],
    });
  } catch (err) {}
};