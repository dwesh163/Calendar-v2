const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

export default function sendEmail(email, from, subject, htmlContent) {
	let secret = {
		user: process.env.USER,
		pass: process.env.PASS,
		from: from,
		subject: subject,
	};

	const transporter = nodemailer.createTransport({
		host: 'mail.infomaniak.com',
		port: 465,
		secure: true,
		auth: {
			user: secret.user,
			pass: secret.pass,
		},
	});

	const mailOptions = {
		from: secret.from,
		to: email,
		subject: secret.subject,
		html: htmlContent,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error(error);
		} else {
			console.log('E-mail envoyé: ' + info.response);
			return;
		}
	});
}
