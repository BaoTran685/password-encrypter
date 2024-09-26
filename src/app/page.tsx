import AnimateText from "@/components/animateText";

const Home = () => {
  return (
    <main className="my-10 sm:my-20">
      <div className="flex pl-10">
        <ol className="text--content list-disc space-y-2">
          <li>Hello...! This app is the renew version of the ...</li>
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
