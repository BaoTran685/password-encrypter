import Link from "next/link";
import styles from '../styles/404.module.css';

const InteralError = () => {
  return (
    <div className={styles.wrap}>
      <h1>Oooops...</h1>
      <h2>Server Error!!!</h2>
      <h3>Go back to the <Link href='/' className={styles.link}>Homepage</Link></h3>
    </div>
  );
 }

export default InteralError;