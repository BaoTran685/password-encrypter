import { useState } from 'react';
import styles from '../styles/generate.module.css';
import Head from 'next/head';
import randomNumber from '../func/randomNumber';

import { notify_error, notify_info } from '@/lib/notify';
import Loader from '@/public/loader.svg'

const MAX = 999999;

const Generate = () => {
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [disableButton, setDisableButton] = useState(false);

	const handleGenerate = () => {
		var number = -1;

		if (input == '') {
			number = randomNumber(12, 17);
		}
		if (input.split(' ').length == 1 && input.length != 0) {
			number = input.length;
		}
		if (!isNaN(Number(input)) && input.trim() != '') {
			number = parseInt(input);
		}
		if (number < 0 || number > MAX) {
			return notify_error('Invalid Input');
		}

		const generate_button = document.getElementById('generate');
		const width = generate_button?.offsetWidth;
		setLoading(true);
		setDisableButton(true);
		if (generate_button) {
			generate_button.style.width = `${width}px`;
		}
		const postData = async () => {
			const res = await fetch('/api/generate/route', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ number })
			});
			if (res.ok) {
				const data = await res.json();
				setInput(data);
				setLoading(false);
				setDisableButton(false);
			} else {
				const retryAfter = await res.json();
				notify_error(`Too Many Attemps - Retry After ${retryAfter}s`, retryAfter * 1000);
				setTimeout(() => {
					setLoading(false);
					setDisableButton(false);
				}, retryAfter * 1000)
				return null;
			}
		}
		postData();
	}
	const copy = () => {
		if (input) {
			navigator.clipboard.writeText(input);
			notify_info('Copied');
		} else {
			notify_error('Invalid Copy')
		}
	}
	const paste = async () => {
		try {
			const val = await navigator.clipboard.readText();
			setInput(val);
			notify_info('Pasted');
		} catch (error) {
			notify_error('Invalid Paste');
		}
	}
	const clear = () => {
		setInput('');
	}
	return (
		<>
			<Head>
				<title>
					Password Encrypter || Generate
				</title>
				<meta name="keywords" content="Encrypter" />
			</Head>
			<div className={styles.section}>
				<textarea
					className={styles.form__input}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="..."
				></textarea>
				<div className={styles.form__function__buttons}>
					<button
						id='generate'
						className={`${styles.form__generate__button} ${styles.button}`}
						disabled={disableButton}
						onClick={handleGenerate}
					>
						{loading ? <Loader className={styles.spinner} /> : 'Generate'}
					</button>
					<button
						className={styles.button}
						onClick={copy}
					>Copy</button>
					<button
						className={styles.button}
						onClick={paste}
					>Paste</button>
					<button
						className={styles.button}
						onClick={clear}
					>Clear</button>
				</div>
			</div>
		</>
	);
}

export default Generate;