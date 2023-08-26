import { useState } from 'react';
import styles from '../styles/function.module.css';
import Head from 'next/head';
import randomNumber from '../func/randomNumber';
import { useSession } from 'next-auth/react';

import { notify_error, notify_info } from '@/lib/notify';
import Loader from '@/public/loader.svg';

const MAX = 999999;
const DELAY = 200;
const BASE_LETTER = "U)bgrV]DP<jFl>ifGoBJhw8e4d'sX_#Ma;/@W(N7pL?-StH^yu:*Q,E!k&20CTx5%I9[1ZOR.K+6A{Y}cznq=$m3v`~|";

const checkInput = (ls: string[]) => {
  var flag = 1;
  if (ls.length == 2 && isNaN(Number(ls[0])) || ls[0].trim() == '') {
    flag = 0;
    return flag;
  }
  ls.forEach((element) => {
    if (element.trim() == '') {
      flag = 0;
    }
  })
  return flag;
}
const checkText = (txt: string) => {
  for (let i=0; i<txt.length; i++) {
    if (BASE_LETTER.includes(txt[i])==false) {
      return 0;
    }
  }
  return 1;
}
const Function = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const { data: session } = useSession();
  const [loading_encrypt, setLoadingEncrypt] = useState(false);
  const [loading_decrypt, setLoadingDecrypt] = useState(false);
	const [disableButton, setDisableButton] = useState(false);

  const encrypt = () => {
    var text_input = input.split(' ');
    var text = '', number = 0;

    if (!checkInput(text_input)) {
      return notify_error('Invalid Input');
    }
    if (text_input.length == 1) {
      number = randomNumber(1000, 10000);
      text = text_input[0];
    }
    else if (text_input.length == 2) {
      number = parseInt(text_input[0]);
      text = text_input[1];
    }
    else {
      return notify_error('Invalid Input');
    }
    if (number > MAX || !checkText(text)) {
      return notify_error('Invalid Input');
    }

    const encrypt_button=document.getElementById('encrypt');
		const width=encrypt_button?.offsetWidth;
    setLoadingEncrypt(true);
    setDisableButton(true);
    if (encrypt_button) {
      encrypt_button.style.width=`${width}px`;
    }

    text=text.replace(/(\r\n|\n|\r)/gm, "");
    const postEncrypt = async () => {
      const res = await fetch('/api/encrypt/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': session?.user.accessToken!
        },
        body: JSON.stringify({ text, number })
      })
      if (res.ok) {
        const data=await res.json();
        setOutput(`${number} ${data}`);
        setLoadingEncrypt(false);
        setDisableButton(false);
			} else {
				const retryAfter = await res.json();
				notify_error(`Too Many Attemps - Retry After ${Math.ceil(retryAfter/1000)} seconds`, retryAfter);
				setTimeout(()=> {
					setLoadingEncrypt(false);
					setDisableButton(false);
				}, retryAfter+DELAY);
				return null;
			}
    }
    postEncrypt();
  }
  const decrypt = () => {
    var text_input = input.split(' ');
    if (!checkInput(text_input) || text_input.length != 2) {
      return notify_error('Invalid Input');
    }
    const decrypt_button=document.getElementById('decrypt');
		const width=decrypt_button?.offsetWidth;
    setLoadingDecrypt(true);
    setDisableButton(true);
    if (decrypt_button) {
      decrypt_button.style.width=`${width}px`;
    }
    
    var number = parseInt(text_input[0]), text = text_input[1];
    text=text.replace(/(\r\n|\n|\r)/gm, "");
    const postData = async () => {
      const res = await fetch('/api/decrypt/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': session?.user.accessToken!
        },
        body: JSON.stringify({ text, number })
      });
      if (res.ok) {
        const data=await res.json();
        setOutput(`${data}`);
        setLoadingDecrypt(false);
        setDisableButton(false);
			} else {
				const retryAfter = await res.json();
				notify_error(`Too Many Attemps - Retry After ${Math.ceil(retryAfter/1000)} seconds`, retryAfter);
				setTimeout(()=> {
					setLoadingEncrypt(false);
					setDisableButton(false);
				}, retryAfter+DELAY);
				return null;
			}
    }
    postData();
  }

  const inputCopy = () => {
    if (input) {
      navigator.clipboard.writeText(input);
      notify_info('Copied');
    } else {
      notify_error('Invalid Copy')
    }
  }
  const inputPaste = async () => {
    try {
      const val = await navigator.clipboard.readText();
      setInput(val);
      notify_info('Pasted');
    } catch (error) {
      notify_error('Invalid Paste');
    }
  }
  const inputClear = () => {
    setInput('');
  }
  const outputCopy = () => {
    if (output) {
      console.log(output);
      navigator.clipboard.writeText(output);
      notify_info('Copied');
    } else {
      notify_error('Invalid Copy')
    }
  }
  const outputClear = () => {
    setOutput('');
  }
  const clear = () => {
    inputClear();
    outputClear();
  }
  return (
    <>
      <Head>
        <title>
          Password Encrypter || Encrypt/Decrypt
        </title>
        <meta name="keywords" content="Encrypter" />
      </Head>
      <div className={styles.section}>
        <div className={styles.form__wrap}>
          <textarea
            className={styles.form__input}
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
            placeholder="Enter Password..."
          ></textarea>
          <div className={styles.form__input__buttons}>
            <button
              className={styles.button}
              onClick={inputCopy}
            >Copy</button>
            <button
              className={styles.button}
              onClick={inputPaste}
            >Paste</button>
            <button
              className={styles.button}
              onClick={inputClear}
            >Clear</button>
          </div>
        </div>
        <div className={styles.form__function__buttons}>
          <button
            id='encrypt'
            className={`${styles.form__encrypt__button} ${styles.button}`}
            disabled={disableButton}
            onClick={encrypt}
          >
            {loading_encrypt ? <Loader className={styles.spinner} /> : 'Encrypt'}
          </button>
          <button
            id='decrypt'
            className={`${styles.form__decrypt__button} ${styles.button}`}
            disabled={disableButton}
            onClick={decrypt} 
          >
            {loading_decrypt ? <Loader className={styles.spinner} /> : 'Decrypt'}
          </button>
          <button
            className={styles.button}
            onClick={clear}
          >Clear</button>
        </div>
        <div className={styles.form__wrap}>
          <textarea
            className={styles.form__output}
            value={output}
            placeholder="..."
            readOnly></textarea>
          <div className={styles.form__output__buttons}>
            <button
              className={styles.button}
              onClick={outputCopy}
            >Copy</button>
            <button
              className={styles.button}
              onClick={outputClear}
            >Clear</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Function;