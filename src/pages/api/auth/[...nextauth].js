import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { v4 as uuidv4 } from 'uuid';
import mysql from 'mysql2/promise';
import { dbConfig } from '/lib/config';
import bcrypt from 'bcrypt';

async function connectMySQL() {
	try {
		const connection = await mysql.createConnection(dbConfig);
		return connection;
	} catch (error) {
		console.error('Error connecting to MySQL:', error);
		throw error;
	}
}

export const authOptions = (req) => ({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const connection = await connectMySQL();
				try {
					const [[user]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [credentials.email]);

					if (user && (await bcrypt.compare(credentials.password, user.user_password))) {
						return {
							id: user.user_id_public,
							name: user.user_name,
							email: user.user_email,
							image: user.user_image,
						};
					} else {
						throw new Error('Invalid email or password');
					}
				} catch (error) {
					console.error('Error during credentials sign-in:', error);
					return null;
				} finally {
					if (connection) connection.end();
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
		error: '/error',
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			const connection = await connectMySQL();
			try {
				const [[existingUser]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [user.email]);

				if (existingUser) {
					await connection.execute('UPDATE users SET user_username = ?, user_image = ?, user_provider = ?, user_company = ?, user_name = ? WHERE user_email = ?', [profile?.login ? profile.login : '', user?.image ? user.image : '', account?.provider ? account?.provider : 'password', profile?.company ? profile.company : '', profile?.name ? profile.name : '', user.email]);
				} else {
					await connection.execute('INSERT INTO users (user_id_public, user_email, user_username, user_image, user_provider, user_company, user_name) VALUES (?, ?, ?, ?, ?, ?, ?)', [uuidv4(), user.email, profile.login ? profile.login : '', user.image ? user.image : '', account.provider ? account.provider : '', profile.company ? profile.company : '', profile.name ? profile.name : '']);
				}

				return Promise.resolve(true);
			} catch (error) {
				console.error('Error during sign-in:', error);
				return Promise.resolve(false);
			} finally {
				if (connection) connection.end();
			}
		},

		async session({ session, token, user }) {
			const connection = await connectMySQL();

			try {
				const [[existingUser]] = await connection.execute('SELECT * FROM users WHERE user_email = ?', [session.user.email]);
				if (existingUser) {
					session.user.id = existingUser.user_id_public;
					session.user.username = existingUser.user_username;
				}
			} catch (error) {
				console.error('Error during session creation:', error);
			} finally {
				if (connection) connection.end();
			}

			return session;
		},
	},
});

export default (req, res) => NextAuth(req, res, authOptions(req));
