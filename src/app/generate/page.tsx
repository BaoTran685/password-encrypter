import { Metadata } from "next";
import GenerateForm from "@/components/form/generateForm";

export const metadata: Metadata = {
  title: "Password Encrypter || Generator",
  description: "Password Generate",
};

const Generate = () => {
  return (
    <GenerateForm />
  );
};

export default Generate;
