import { useState } from 'react';
import styles from '../styles/generate.module.css';
import Head from 'next/head';
import randomNumber from '../func/randomNumber';

import { notify_error, notify_info } from '@/lib/notify';

const Generate = () => {
	const [input, setInput] = useState('');
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
		if (number < 0) {
			notify_error('Invalid Input');
			return;
		}
		const postData = async () => {
			const res = await fetch('/api/generate/route', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ number })
			});
			return res.json();
		}
		postData().then(data => {
			setInput(data);
		});
	}
	const copy = () => {
		const input_area = document.getElementById('input') as HTMLTextAreaElement;
		input_area.select();
		input_area.setSelectionRange(0, 9999);
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
    } catch(error) {
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
				<div className={`${styles.form__error} ${styles.hidden}`}></div>
				<textarea
					id='input'
					className={styles.form__input}
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="..."
				></textarea>
				<div className={styles.form__function__buttons}>
					<button
						className={`${styles.form__generate__button} ${styles.button}`}
						onClick={handleGenerate}
					>Generate</button>
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