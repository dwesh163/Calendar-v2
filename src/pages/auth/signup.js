// pages/auth/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Signup() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, name }),
		});

		if (res.ok) {
			router.push('/auth/signin');
		} else {
			const data = await res.json();
			setError(data.message);
		}
	};

	return (
		<>
			<Head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="apple-mobile-web-app-title" content="Musics" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<link rel="manifest" href="/manifest.json" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Login</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
				<link rel="manifest" href="/favicon/site.webmanifest" />
				<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#00aba9" />
				<meta name="theme-color" content="#ffffff" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
				<script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous"></script>
				<script src="https://cdn.tailwindcss.com"></script>
				<style>
					{`
						body {
							font-family: 'Inter', sans-serif;
						}
					`}
				</style>
			</Head>
			<main>
				<div className="flex flex-col w-full items-center justify-center min-h-screen bg-[#171719]">
					<div className="sm:w-full sm:max-w-sm p-8 w-full">
						<h1 className="font-semibold rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center mb-10 tracking-tighter text-sky-600 text-5xl">MUSICS</h1>
						<h2 className="text-center text-xl text-white mb-5">Create a new account</h2>
						<form onSubmit={handleSubmit} className="flex flex-col gap-4">
							<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="px-3 py-2 rounded-lg drop-shadow-md shadow-2xl" />
							<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="px-3 py-2 rounded-lg drop-shadow-md shadow-2xl" />
							<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="px-3 py-2 rounded-lg drop-shadow-md shadow-2xl" />
							<button type="submit" className="transition-100 px-2 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg drop-shadow-md shadow-2xl text-white">
								Sign Up
							</button>
							{error && <p className="text-red-500">{error}</p>}
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
