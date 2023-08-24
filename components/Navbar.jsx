
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const {data: session}=useSession();
  return (
    <nav>
      
      <div className="header">
        <Link href='/' className="title"><h1>Password Encrypter</h1></Link>
      </div>
      <div className="wrap">
        {session?.user ? 
        (
          <Link href='/update' className="a"><p>Update</p></Link>
        ) : 
        (
          <></>
        )
        }
        <Link href='/generate' className="a"><p>Generate</p></Link>
        <Link href='/function' className="a"><p>Encrypt/Decrypt</p></Link>
        <Link href='/about' className="a"><p>About</p></Link>
        {session?.user ? 
        (
          <button onClick={signOut}>Log Out</button>
        ) : 
        (
          <button onClick={signIn}>Log In</button>
        )
        }
      </div>
      
    </nav>
  );
}
 
export default NavBar;