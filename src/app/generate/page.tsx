"use client";

import InputItem from "@/components/form/inputItem";
import LoadingButton from "@/components/form/loadingButton";
import { generatePassword } from "@/components/form/postData";
import { cn } from "@/lib/tailwind-merge";
import { FormEvent, useState } from "react";

// label,
//   name,
//   type,
//   placeholder,
//   onChange,
//   value,
//   isError,
//   readonly,

const Input = {
  specialChar: {
    label: "Number of Special Characters",
    name: "specialChar",
    type: "number",
    placeholder: "0",
    readonly: false,
  },
  upperCase: {
    label: "Number of Upper-Case Letters",
    name: "upperCase",
    type: "number",
    placeholder: "0",
    readonly: false,
  },
  password: {
    label: "Generated Password",
    name: "password",
    type: "text",
    placeholder: "...",
    readonly: true,
  },
};
const LOW = 0;
const HIGH = 20;

const Generate = () => {
  const [specialChar, setSpecialChar] = useState();
  const [specialCharError, setSpecialCharError] = useState(false);
  const [specialCharErrorMessage, setSpecialCharErrorMessage] = useState("");

  const [upperCase, setUpperCase] = useState();
  const [upperCaseError, setUpperCaseError] = useState(false);
  const [upperCaseErrorMessage, setUpperCaseErrorMessage] = useState("");

  const [password, setPassword] = useState("");

  const [process, setProcess] = useState(false);
  const [processMessage, setProcessMessage] = useState("");
  const [isProcessSuccess, setIsProcessSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkInput = ({
      specialChar,
      upperCase,
    }: {
      specialChar: number;
      upperCase: number;
    }) => {
      var ret = true;
      if (specialChar < LOW || specialChar > HIGH) {
        setSpecialCharError(true);
        setSpecialCharErrorMessage(`Must be >= ${LOW} and <= ${HIGH}`);
        ret = false;
      }
      if (upperCase < LOW || upperCase > HIGH) {
        setUpperCaseError(true);
        setUpperCaseErrorMessage(`Must be >= ${LOW} and <= ${HIGH}`);
        ret = false;
      }
      return ret;
    };

    if (specialChar == undefined) {
      setSpecialCharError(true);
      setSpecialCharErrorMessage('Please enter field');
    }
    if (upperCase == undefined) {
      setUpperCaseError(true);
      setUpperCaseErrorMessage('Please enter field');
    }
    if (specialChar == undefined || upperCase == undefined) return;

    const ok = checkInput({ specialChar, upperCase });
    if (!ok) {
      return;
    }

    setProcess(true);
    const res = await generatePassword({
      specialChar,
      upperCase,
    });

    setPassword(res.password);
    setIsProcessSuccess(res.ok);
    if (res.ok) {
      setProcessMessage("success");
    } else {
      setProcessMessage("fail");
    }
    setProcess(false);
  };

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.name == Input.specialChar.name) {
      setSpecialChar(event.currentTarget.value);
      setSpecialCharError(false);
      setSpecialCharErrorMessage("");
    } else if (event.currentTarget.name == Input.upperCase.name) {
      setUpperCase(event.currentTarget.value);
      setUpperCaseError(false);
      setUpperCaseErrorMessage("");
    }
    setProcessMessage("");
  };

  return (
    <main className="my--container mx-auto my-10 sm:my-20">
      <form
        className="flex flex-col space-y-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <InputItem
              value={specialChar}
              isError={specialCharError}
              onChange={handleChange}
              {...Input.specialChar}
            />
            {specialCharError && (
              <div className="text-sm font-medium text-red-600 pt-1">
                {specialCharErrorMessage}
              </div>
            )}
          </div>
          <div>
            <InputItem
              value={upperCase}
              isError={upperCaseError}
              onChange={handleChange}
              {...Input.upperCase}
            />
            {upperCaseError && (
              <div className="text-sm font-medium text-red-600 pt-1">
                {upperCaseErrorMessage}
              </div>
            )}
          </div>
        </div>
        <LoadingButton
          type="submit"
          text="Generate"
          isLoading={process}
          isSuccess={false}
        />
        <div>
          <InputItem
            value={password}
            isError={false}
            onChange={() => {}}
            {...Input.password}
          />
          {Boolean(processMessage) && (
            <div
              className={cn("text-sm font-medium", {
                "text-[#21A179]": isProcessSuccess,
                "text-red-600": !isProcessSuccess,
              })}
            >
              {processMessage}
            </div>
          )}
        </div>
      </form>
    </main>
  );
};

export default Generate;
