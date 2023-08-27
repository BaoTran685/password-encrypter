import { useState } from 'react';
import styles from '../styles/function.module.css';
import Head from 'next/head';
import randomNumber from '../func/randomNumber';
import { useSession } from 'next-auth/react';

import { notify_error, notify_info } from '@/lib/notify';
import Loader from '@/public/loader.svg';

const MAX = 999999;
const LOWER = 1000;
const HIGHER = 100000;
const DELAY = 200;
const BASE_LETTER = "U)bgrV]DP<jFl>ifGoBJhw8e4d'sX_#Ma;/@W(N7pL?-StH^yu:*Q,E!k&20CTx5%I9[1ZOR.K+6A{Y}cznq=$m3v`~|";

const checkText = (txt: string) => {
  for (let i = 0; i < txt.length; i++) {
    if (BASE_LETTER.includes(txt[i]) == false) {
      return 0;
    }
  }
  return 1;
}

const checkInput = (ls: string[]) => {
  var number: number = 0, text: string = '';
  if (ls.length == 1) {
    text = ls[0];
    if (text == '' || !checkText(text)) {
      notify_error('Non Admissible Text')
      return null;
    }
  } else if (ls.length == 2) {
    console.log(ls);
    if (isNaN(Number(ls[0])) || ls[0] == '') {
      notify_error('Non Admissible Key');
      return null;
    }
    number = parseInt(ls[0]);
    text = ls[1];
    if (number < 0 || number > MAX) {
      notify_error('Non Admissible Key');
      return null;
    }
    if (!checkText(text) || text == '') {
      notify_error('Non Admissible Text');
      return null;
    }
  } else {
    notify_error('Non Admissible Text')
    return null;
  }
  if (number == 0) {
    number = randomNumber(LOWER, HIGHER);
  }
  text = text.replace(/(\r\n|\n|\r)/gm, '');
  return { number, text };
}

const Function = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const { data: session } = useSession();
  const [loading_encrypt, setLoadingEncrypt] = useState(false);
  const [loading_decrypt, setLoadingDecrypt] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const postData = async (text: string, number: number, type: boolean) => {
    const res = await fetch('/api/encrypt/route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': session?.user.accessToken!
      },
      body: JSON.stringify({ text, number, type })
    });
    if (res.ok) {
      const data = await res.json();
      if (type === true) {
        setLoadingEncrypt(false);
        setOutput(`${number} ${data}`);
      } else {
        setLoadingDecrypt(false);
        setOutput(`${data}`);
      }
      setDisableButton(false);
    } else {
      const retryAfter = await res.json();
      notify_error(`Too Many Requests - Try Again After ${Math.ceil(retryAfter / 1000)} seconds`, retryAfter);
      setTimeout(() => {
        if (type === true) {
          setLoadingEncrypt(false);
        } else {
          setLoadingDecrypt(false);
        }
        setDisableButton(false);
      }, retryAfter + DELAY);
    }
  }

  const encrypt = () => {
    const text_input = input.split(' ');
    const back = checkInput(text_input);
    if (back) {
      const { number, text } = back;
      const encrypt_button = document.getElementById('encrypt');
      const width = encrypt_button?.offsetWidth;
      setLoadingEncrypt(true);
      setDisableButton(true);
      if (encrypt_button) {
        encrypt_button.style.width = `${width}px`;
      }
      postData(text, number, true);
    }
    return;
  }

  const decrypt = () => {
    const text_input = input.split(' ');
    const back = checkInput(text_input);

    if (text_input.length != 2) {
      notify_error('Two Inputs Required');
      return;
    }
    if (back) {
      const { number, text } = back;
      const decrypt_button = document.getElementById('decrypt');
      const width = decrypt_button?.offsetWidth;
      setLoadingDecrypt(true);
      setDisableButton(true);
      if (decrypt_button) {
        decrypt_button.style.width = `${width}px`;
      }
      postData(text, number, false);
    }
  }

  const copy = (type: boolean) => {
    const toCopy = type ? input : output;
    if (toCopy) {
      navigator.clipboard.writeText(toCopy);
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
  const choosingClear = (type: boolean) => {
    if (type) {
      setInput('');
    } else {
      setOutput('');
    }
  }
  const clear = () => {
    setInput('');
    setOutput('');
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
              onClick={() => { copy(true) }}
            >Copy</button>
            <button
              className={styles.button}
              onClick={paste}
            >Paste</button>
            <button
              className={styles.button}
              onClick={() => { choosingClear(true) }}
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
              onClick={() => { copy(false) }}
            >Copy</button>
            <button
              className={styles.button}
              onClick={() => { choosingClear(false) }}
            >Clear</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Function;