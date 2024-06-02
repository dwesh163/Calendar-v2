// pages/auth/signup.js
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const StepOne = ({ name, setName, lastname, setLastname, username, setUsername, email, setEmail, password, setPassword, showPassword, handleTogglePassword }) => (
	<>
		<div className="w-full flex justify-beetwen gap-2">
			<div className="sm:mb-4 mb-3">
				<label htmlFor="name" className="block text-gray-700 font-bold sm:mb-2 mb-1">
					Name
				</label>
				<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md border-gray-300" placeholder="Your name" required />
			</div>
			<div className="sm:mb-4 mb-3">
				<label htmlFor="lastname" className="block text-gray-700 font-bold sm:mb-2 mb-1">
					Last name
				</label>
				<input type="text" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} className="w-full px-4 py-2 border rounded-md border-gray-300" placeholder="Your lastname" required />
			</div>
		</div>
		<div className="sm:mb-4 mb-3">
			<label htmlFor="username" className="block text-gray-700 font-bold sm:mb-2 mb-1">
				Username
			</label>
			<input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md border-gray-300" placeholder="Username" required />
		</div>
		<div className="sm:mb-4 mb-3">
			<label htmlFor="email" className="block text-gray-700 font-bold sm:mb-2 mb-1">
				Email
			</label>
			<input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md border-gray-300" placeholder="name@example.com" required />
		</div>
		<div className="sm:mb-4 mb-3 relative">
			<label htmlFor="password" className="block text-gray-700 font-bold sm:mb-2 mb-1">
				Password
			</label>
			<input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md border-gray-300" placeholder="••••••••" required />
			<button type="button" onClick={handleTogglePassword} className="absolute inset-y-0 h-10 sm:mt-[2.125rem] mt-[1.79rem] right-0 pr-3 flex items-center text-gray-500">
				{showPassword ? (
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
						<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
						<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
						<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
						<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
						<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
					</svg>
				)}
			</button>
		</div>
	</>
);

const StepOTP = ({ otp, setOtp, email, summitOtp }) => {
	const inputsRef = useRef([]);

	const handleKeyDown = (e, index) => {
		if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
			e.preventDefault();
		}

		if (e.key === 'Delete' || e.key === 'Backspace') {
			if (index > 0) {
				if (index === inputsRef.current.length - 1 && inputsRef.current[index].value != '') {
					inputsRef.current[index].value = '';
				} else {
					inputsRef.current[index - 1].value = '';
					inputsRef.current[index - 1].focus();
				}
			}
		}

		if (index === inputsRef.current.length - 1 && e.key == 'Enter') {
			summitOtp();
		}
	};

	const handleInput = (e, index) => {
		const { value } = e.target;
		if (value) {
			if (index < inputsRef.current.length - 1) {
				inputsRef.current[index + 1].focus();
			}
		}
		const otpValue = inputsRef.current.map((input) => input.value).join('');
		setOtp(otpValue);
	};

	const handleFocus = (e) => {
		e.target.select();
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const text = e.clipboardData.getData('text');
		if (!/^[0-9]{4}$/.test(text)) {
			return;
		}
		text.split('').forEach((char, index) => {
			inputsRef.current[index].value = char;
		});
		setOtp(text);
		inputsRef.current[inputsRef.current.length - 1].focus();
	};

	return (
		<div className="w-full">
			<header className="mb-8 text-center">
				<p className="text-[15px] text-slate-500">
					Enter the 6-digit verification code that was sent to <br />
					<strong>{email}</strong>
				</p>
			</header>
			<div>
				<div className="flex items-center justify-center gap-3">
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<input key={index} type="text" className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" maxLength="1" ref={(el) => (inputsRef.current[index] = el)} onKeyDown={(e) => handleKeyDown(e, index)} onInput={(e) => handleInput(e, index)} onFocus={handleFocus} onPaste={handlePaste} />
						))}
				</div>
				<button onClick={summitOtp} className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 text-white mt-8 font-semibold rounded-md">
					Verify Account
				</button>
			</div>
			<div className="text-sm text-slate-500 mt-4">
				Didn't receive code?{' '}
				<button onClick={() => console.log('resend')} className="text-blue-600 hover:underline cursor-pointer">
					Resend
				</button>
			</div>
		</div>
	);
};

const StepSuccess = () => (
	<div className="flex flex-col items-center justify-center mt-8">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-24 h-24 text-green-600" viewBox="0 0 16 16">
			<path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
			<path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
		</svg>
		<h2 className="sm:text-2xl text-xl font-bold text-gray-800 mt-4">Signup Successful!</h2>
		<p className="text-gray-600 mt-2">
			You have successfully signed up. You can now{' '}
			<a href="/auth/signin" className="text-blue-600 hover:underline">
				Sign in
			</a>
		</p>
	</div>
);

export default function Signup() {
	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [otp, setOtp] = useState('');
	const [error, setError] = useState('');
	const [otpId, setOtpId] = useState('');
	const router = useRouter();

	const handleTogglePassword = () => setShowPassword((prev) => !prev);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password, name: `${name} ${lastname}`, username }),
		});

		if (res.ok) {
			const data = await res.json();
			setOtpId(data.otpId);
			setStep(2);
		} else {
			const data = await res.json();
			setError(data.message);
		}
	};

	const summitOtp = async () => {
		const res = await fetch('/api/auth/verify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ otp, otpId }),
		});

		if (res.ok) {
			setStep(3);
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
				<style>
					{`
						body {
							font-family: 'Inter', sans-serif;
						}
					`}
				</style>
			</Head>
			<main className="bg-white flex items-center justify-center h-full font-inter mt-12 sm:mt-0 sm:h-screen">
				<div className="bg-white sm:p-8 xl:w-1/2 sm:w-[60%] xl:-mt-12 w-full flex justify-center select-none">
					<div className="bg-white sm:p-8 p-6 xl:w-[65%] w-full select-none">
						{step < 2 && (
							<div className="flex flex-col items-center justify-center">
								<div className="flex items-center sm:mb-20 mb-8">
									<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-12 sm:h-12 w-8 h-8 -mt-0.5">
										<path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M11 13H13M11 17H13M16 13H18M16 17H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<h1 className="sm:text-4xl text-2xl font-bold text-gray-800 sm:ml-2 ml-1">Calendar</h1>
								</div>
							</div>
						)}

						<h2 className="sm:text-2xl text-lg font-semibold sm:mb-6 mb-1 text-gray-800">{step === 1 ? 'Sign up' : step === 2 ? 'Email Verification' : ''}</h2>

						{step === 1 && (
							<form onSubmit={handleSubmit}>
								<StepOne name={name} setName={setName} lastname={lastname} setLastname={setLastname} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} showPassword={showPassword} handleTogglePassword={handleTogglePassword} />
								{error && <p className="text-red-500 text-sm">{error}</p>}
								<button type="submit" className="w-full py-3 bg-zinc-950 hover:bg-zinc-900 text-white mt-4 font-semibold rounded-md">
									Sign up
								</button>
							</form>
						)}

						{step === 2 && <StepOTP otp={otp} setOtp={setOtp} email={email} summitOtp={summitOtp} />}
						{step === 3 && <StepSuccess />}
					</div>
				</div>

				<div className="hidden xl:block xl:w-1/2 h-full select-none">
					<img src="/signin.jpg" alt="Signin" className="object-cover w-full h-full" />
				</div>
			</main>
		</>
	);
}
