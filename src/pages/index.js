import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home({ isStarted, setIsStarted }) {
	const { data: session, status } = useSession();

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
				<div className="container">
					<h1>Home</h1>
					{!session && (
						<>
							<button onClick={() => signIn()}>Sign in</button>
						</>
					)}
					{session && (
						<>
							<p>Hi {session.user.name}!</p>
							<p>Your email is {session.user.email}.</p>
						</>
					)}
				</div>
			</main>
		</>
	);
}
