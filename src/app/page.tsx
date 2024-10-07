import { Metadata } from "next";
import FunctionForm from "@/components/form/functionForm";

export const metadata: Metadata = {
  title: "Password Encrypter || Encrypt/Decrypt",
  description: "Password Encryption Decryption",
};

const Home = () => {
  return (
    <FunctionForm />
  );
};

export default Home;