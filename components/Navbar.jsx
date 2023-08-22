
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const {data: session}=useSession();
  return (
    <nav>
      <div className="header">
        <h1>Password Encrypter</h1>
      </div>
      {session?.user ? 
      (
        <Link href='/update'><p>Update</p></Link>
      ) : 
      (
        <></>
      )
      }
      <Link href='/'><p>Home</p></Link>
      <Link href='/generate'><p>Generate</p></Link>
      <Link href='/function'><p>Encrypt/Decrypt</p></Link>
      <Link href='/about'><p>About</p></Link>
      {session?.user ? 
      (
        <button onClick={signOut}>Log Out</button>
      ) : 
      (
        <button onClick={signIn}>Log In</button>
      )
      }
    </nav>
  );
}
 
export default NavBar;