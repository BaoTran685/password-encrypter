import Head from 'next/head';
import styles from '../styles/home.module.css';
import AnimateText from '../components/AnimateText';

export default function Home() {

  return (
    <>
      <Head>
        <title>
          Password Encrypter || Home
        </title>
        <meta name="keywords" content="Encrypter" />
      </Head>
      <div className={styles.home_wrap}>
        <div className={styles.home_title}>
          <AnimateText  text="Welcome to Password Encrypter ..." />
        </div>
      </div>
      
    </>
  );
}
