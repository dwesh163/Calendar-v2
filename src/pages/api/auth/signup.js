// pages/api/auth/signup.js
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { dbConfig } from '/lib/config';
import mysql from 'mysql2/promise';

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

		await connection.execute('INSERT INTO users (user_id_public, user_email, user_password, user_name) VALUES (?, ?, ?, ?)', [uuidv4(), email, hashedPassword, name]);

		res.status(201).json({ message: 'User created' });
	} catch (error) {
		console.error('Error during user sign-up:', error);
		res.status(500).json({ message: 'Internal server error' });
	} finally {
		if (connection) connection.end();
	}
};
