import Link from "next/link";
import styles from '../styles/404.module.css';

const NotFound = () => {
  return (
    <div className={styles.wrap}>
      <h1>Oooops...</h1>
      <h2>The page cannot be found!!!</h2>
      <h3>Go back to the <Link href='/' className={styles.link}>Homepage</Link></h3>
    </div>
  );
}
 
export default NotFound;