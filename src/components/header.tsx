import Link from "next/link";
import Line from "./line";

const links = [
  {
    link: "/generate",
    name: "Generate",
  },
  {
    link: "/function",
    name: "Encrypt",
  },
  // {
  //   link: "/about",
  //   name: "About",
  // },
];
const Header = () => {
  return (
    <nav>
      <div className="flex flex-col sm:flex-row sm:justify-between py-4 sm:py-5 md:py-6">
        <Link href="/">
          <p className="text--main--header text-center">Password Encrypter</p>
        </Link>
        <div className="flex flex-row justify-center items-end space-x-4 sm:space-x-8 mt-2 sm:mt-0">
          {links.map((item, index) => (
            <Link key={index} href={item.link} className="hover:underline">
              <p className="text--sub--header">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <Line />
    </nav>
  );
};

export default Header;
