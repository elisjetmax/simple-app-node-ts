const config = require("../../config");
export const sendEmailTransport = async ({
  emailTo,
  subject,
  html,
  textCopy = "",
  callback = null,
}) => {
  console.log("emailTo 1111:>> ", emailTo);
  const sgMail = require("@sendgrid/mail");

  sgMail.setApiKey(config.SENDGRID_API_KEY);

  const originalEmailTo = emailTo;
  let host = config.HOST_PRODUCTION;
  if (config.NODE_ENV === "development") {
    emailTo = config.DEBUG_EMAIL_SENDER;
    host = config.HOST_DEVELOPMENT;
  }

  const fs = require("fs").promises;
  let htmlTemp = await fs.readFile(
    __dirname + "/../templates/generic.html",
    "utf8"
  );

  html = html.replace(/__host/gi, host);

  htmlTemp = htmlTemp.replace("__content", html);

  if (config.NODE_ENV === "development")
    htmlTemp =
      htmlTemp +
      "<hr/><p>Original Email Recipient: " +
      originalEmailTo +
      "<br/>Debug Mode: ON<p>";

  console.log("emailTo :>> ", emailTo);
  const arrTo = emailTo.split(",");

  const toEmails = arrTo.map((email) => ({ email }));

  const msg = {
    personalizations: [
      {
        to: toEmails,
      },
    ],

    from: {
      email: config.SENDGRID_SENDER_EMAIL,
      name: config.SENDGRID_SENDER_NAME,
    },
    subject: subject,
    text: textCopy,
    html: htmlTemp,
  };
  sgMail
    .send(msg)
    .then((data) => {
      if (callback) callback({ success: "Email Sent", data });
    })
    .catch((error) => {
      console.log("Error enviando el correo");
      console.error(error);
      const { body } = error.response;
      console.error("body", body);
      if (callback) callback({ exception: error });
    });
};
