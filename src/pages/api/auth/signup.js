import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { dbConfig } from '/lib/config';
import sendEmail from '/lib/mail';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

const generateRandomOTP = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

export default async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({ message: 'Missing fields' });
	}

	const connection = await connectMySQL();

	try {
		const [[existingUser]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [email]);

		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const id = uuidv4();
		const otp = generateRandomOTP();

		let htmlContent;
		try {
			const filePath = path.join(process.cwd(), 'mail.html');
			htmlContent = fs.readFileSync(filePath, 'utf-8');
			htmlContent = htmlContent.replace('AHDUWHJFIUDHFOIHJFIOEHAF', otp);
		} catch (error) {
			console.error('Error reading HTML file:', error);
			return res.status(500).json({ message: 'Internal server error' });
		}

		sendEmail(email, 'Your Verification Code <contact@komokamping.com>', 'Your verification code', htmlContent);

		await connection.execute('INSERT INTO users (user_id_public, user_email, user_password, user_name, user_verified) VALUES (?, ?, ?, ?, ?)', [uuidv4(), email, hashedPassword, name, 0]);
		await connection.execute('INSERT INTO verification_code (user_id, code, code_id_public) VALUES ((SELECT user_id FROM users WHERE user_email = ?), ?, ?)', [email, otp, id]);

		res.status(201).json({ message: 'User created', otpId: id });
	} catch (error) {
		console.error('Error during user sign-up:', error);
		res.status(500).json({ message: 'Internal server error' });
	} finally {
		if (connection) connection.end();
	}
};
