import Head from 'next/head';
import styles from '../styles/login.module.css';
import { useState, useEffect, FormEventHandler } from 'react';
import { signIn, useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import Loader from '@/public/loader.svg';
import { notify_error, notify_success } from '@/lib/notify';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState("password");

  const {data: session}=useSession();
  const route=useRouter();

  const [loading, setLoading]=useState(false);
  const [disableButton, setDisableButton]=useState(false);

  const handleCheck = (flag: Boolean) => {
    if (flag === true) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const handleSubmit = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    
    setLoading(true);
    setDisableButton(true);

    const postData = async () => {
      const res = await signIn('credentials', {
        username, password, redirect: false
      });
      if (res?.ok) {
        notify_success('Logged In');
      } else {
        notify_error('Invalid Username or Password');
      }
    }
    await postData();
    setTimeout(() => {setLoading(false); setDisableButton(false)}, 150);
  }
  useEffect(() => {
    if (session?.user) {
      route.push('/');
    }
  }, [session])
  return (
    <>
      <Head>
        <title>
          Password Encrypter || Login
        </title>
        <meta name="keywords" content="Encrypter" />
      </Head>
      <div className={styles.wrap}>
        <form className={styles.login}>
          <input
            type="text"
            className={styles.username}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type={passwordType}
            className={styles.password}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.showPassword}>
            <input
              type="checkbox"
              onChange={(e) => handleCheck(e.target.checked)}
            />
            <a> Show Password</a>
          </div>
          <button
            type='submit'
            className={styles.login__button}
            disabled={disableButton}
            onClick={(e)=>handleSubmit(e)}
          >
            {loading ? <Loader className={styles.spinner} /> : 'Log In'}
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;