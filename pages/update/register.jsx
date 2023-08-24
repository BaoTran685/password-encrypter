import styles from '@/styles/register.module.css'
import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

import { notify_error, notify_info, notify_success } from '@/lib/notify';
import { useSession } from 'next-auth/react';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordType, setPasswordType] = useState("password");

  const {data: session}=useSession();
  const handleCheck = (flag) => {
    if (flag === true) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/user/route', {
      method: 'GET',
      headers: {
        'authorization': session.user.accessToken
      }
    });
    const users = await res.json();
    if (users.includes(username)) {
      notify_error('Used Username');
      setUsername('');
      return;
    }
    if (password !== confirmPassword) {
      notify_error('Unmatched Passwords');
      return;
    }
    if (session.user.isAdmin==false) {
      notify_error('Not Applicable');
      return;
    }
    const postData = async () => {
      const res = await fetch('/api/register/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': session.user.accessToken
        },
        body: JSON.stringify({ username, password })
      })
      return res.json();
    };
    const user = await postData();
    notify_success(`${user.username} Registered `);
  }
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
          <input
            type={passwordType}
            className={styles.password}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className={styles.showPassword}>
            <input
              className={styles.showPasswordBox}
              type="checkbox"
              onChange={(e) => handleCheck(e.target.checked)}
            />
            <a className={styles.passwordShowing}> Show Password</a>
          </div>
          <button
            type='submit'
            className={styles.login__button}
            onClick={(e) => handleSubmit(e)}
          >Register</button>
        </form>
      </div>
    </>
  );
}
export default SignInPage;