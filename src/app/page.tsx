import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Password Encrypter || Home",
  description: "Password Encryption Home Page",
};

const password_encrypter_link = "https://passwordencrypter.com/";
const Home = () => {
  return (
    <main className="my-10 sm:my-20">
      <div className="flex px-6 sm:px-8 lg:px-10">
        <ol className="text--content list-disc space-y-2 sm:space-y-4">
          <li>
            Hello, Welcome to Password Encrypter!!! This app was created in my
            grade 12 summer. Well, to be honest this is the newer version and I
            have attached the link to the older one{" "}
            <Link
              href={password_encrypter_link}
              rel="noopener noreferrer"
              target="_blank"
              className="underline decoration-2 decoration-blue-400"
            >
              here
            </Link>
            .
          </li>
          <li>
            <span className="text-[--red-color] font-bold">
              For the Generate Page,
            </span>{" "}
            it can generate passwords based on user's inputs on the length, the
            number of special characters, the number of upper case letters.
          </li>
          <li>
            <span className="text-[--orange-color] font-bold">
              For the Encrypt Page,
            </span>{" "}
            the algorithm used for the encryption includes hashing and salting,
            making it <span className="font-semibold">99.99%</span> secure
            against cracking attempts. To further clarify, if one wants to
            decrypt the encrytped password, then one must have the encryption
            key.
          </li>
        </ol>
      </div>
    </main>
  );
};

export default Home;
