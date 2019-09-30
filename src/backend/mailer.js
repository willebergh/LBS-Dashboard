const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const templates = {
    newUser: (receiver, data) => {
        let options = {
            from: "LBS-Dashboard <williambergh.development@gmail.com>",
            subject: "Register your new account",
            to: receiver,
            html: "",
        }
        options.html += "<p>You have been invited to register a new account for LBS-Dashboard</p>";
        options.html += `<br/>Please continue by clicking the link <a href="${data.link}" target="_blank">here</a> or down below.<br/><a href="${data.link}" target="_blank">${data.link}</a>`;
        options.html += "<p>Thanks for choosing LBS-Dashboard.</p>";

        return options;
    },
    emailConfirmation: (receiver, data) => {
        let options = {
            from: "LBS-Dashboard <williambergh.development@gmail.com>",
            subject: "Email confirmation",
            to: receiver,
            html: ""
        }
        options.html += "<p>Please confirm your email for your new account</p>";
        options.html += `<br/>Please continue by clicking the link <a href="${data.link}" target="_blank">here</a> or down below.<br/><a href="${data.link}" target="_blank">${data.link}</a>`;
        options.html += "<p>Thanks for choosing LBS-Dashboard.</p>";

        return options;
    },
    passwordReset: (receiver, data) => {
        let options = {
            from: "LBS-Dashboard <williambergh.development@gmail.com>",
            subject: "Password reset",
            to: receiver,
            html: ""
        }
        options.html += "<p>Password resetd</p>";
        options.html += `<br/>Please continue by clicking the link <a href="${data.link}" target="_blank">here</a> or down below.<br/><a href="${data.link}" target="_blank">${data.link}</a>`;
        options.html += "<p>Thanks for choosing LBS-Dashboard.</p>";

        return options;
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports.sendMail = function (receiver, template, data) {
    return new Promise((resolve, reject) => {

        if (!receiver) return reject({ error: "no-receiver", msg: "no receiver provieded" });
        if (typeof receiver !== "string") return reject({ error: "invalid-datatype", msg: "reciver has to be a string" });
        if (!validateEmail(receiver)) return reject({ error: "invalid-email", msg: "The receiver is not an valid email address" })

        if (!template) return reject({ error: "no-template", msg: "No template was provieded" });
        if (typeof template !== "string") return reject({ error: "invalid-datatype", msg: "The template has to be a string" });

        const mailOptions = Object.entries(templates).find(([k]) => k === template)[1];
        if (!mailOptions) return reject({ error: "invalid-template", msg: "Could not find template " + template })

        transporter.sendMail(templates[template](receiver, data), (err, info) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(info);
            }
        })
    })
}