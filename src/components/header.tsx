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
  {
    link: "/about",
    name: "About",
  },
];
const Header = () => {
  return (
    <nav>
      <div className="flex flex-col sm:flex-row sm:justify-between my-2 py-2 sm:my-3 sm:py-3 md:my-4 md:py-4">
        <Link href="/">
          <p className="text--main--header text-center">Password Encrypter</p>
        </Link>
        <div className="flex flex-row justify-center items-end space-x-12 sm:space-x-8 lg:space-x-12 mt-2 sm:mt-0">
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
