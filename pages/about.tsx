import styles from '../styles/about.module.css';
import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>
          Password Encrypter || About
        </title>
        <meta name="keywords" content="Encrypter" />
      </Head>
      <div className={styles.about_wrap}>
        <div className={styles.about_title}>About</div>
        <ul className={styles.about_content}>
          <li className={styles.element}>I am Bao, a high school graduated student. This is a fun project that I created during summer.</li>
          <li className={styles.element}>It is meant to provide an <span className={styles.bold_1}>extra layer of protection</span> for your password.</li>
          <li className={styles.element}><span className={styles.bold_1}>Enjoy!</span></li>
        </ul>
      </div>
      <div className={styles.about_wrap}>
        <div className={styles.about_title}>Instruction</div>
        <ul className={styles.about_content}>
          <li className={styles.element}>For the <span className={styles.bold_1}>Generate Page</span>, you can choose to enter a number to specify <span className={styles.bold_2}>the length</span> or otherwise <span className={styles.bold_2}>the length</span> will be random.</li>
          <li className={styles.element}>For the <span className={styles.bold_1}>Encrypt/Decrypt Page</span>, you can choose to enter a number before the text to specify the <span className={styles.bold_2}>encrypting/decrypting key</span>.</li>
          <li className={styles.element}>For the <span className={styles.bold_1}>Login Page</span>, it is <span className={styles.bold_2}>only</span> for me.</li>
        </ul>
      </div>
    </>
  );
}

export default About;