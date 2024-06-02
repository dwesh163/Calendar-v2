// pages/api/auth/verify.js
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { dbConfig } from '/lib/config';
import mysql from 'mysql2/promise';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export default async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const { otp, otpId } = req.body;

	if (!otp || !otpId) {
		return res.status(400).json({ message: 'Missing fields' });
	}

	const connection = await connectMySQL();

	try {
		const [[verificationCode]] = await connection.execute('SELECT * FROM verification_code WHERE code_id_public = ?', [otpId]);

		if (!verificationCode) {
			return res.status(400).json({ message: 'No verification code' });
		}

		const [[user]] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [verificationCode.user_id]);

		if (parseInt(verificationCode.code) !== parseInt(otp)) {
			return res.status(400).json({ message: 'Invalid verification code' });
		} else {
			await connection.execute('UPDATE users SET user_verified = 1 WHERE user_id = ?', [user.user_id]);
			await connection.execute('DELETE FROM verification_code WHERE code_id_public = ?', [otpId]);
			res.status(201).json({ message: 'ok' });
		}
	} catch (error) {
		console.error('Error during user sign-up:', error);
		res.status(500).json({ message: 'Internal server error' });
	} finally {
		if (connection) connection.end();
	}
};
