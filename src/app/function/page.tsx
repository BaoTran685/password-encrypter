"use client";

import InputItem from "@/components/form/inputItem";
import LoadingButton from "@/components/form/loadingButton";
import { functionPassword } from "@/components/form/postData";
import { cn } from "@/lib/tailwind-merge";
import { FormEvent, useState } from "react";

const Input = {
  key: {
    label: "Key",
    name: "key",
    type: "key",
    placeholder: "",
    readonly: false,
  },
  password: {
    label: "Password",
    name: "password",
    type: "text",
    placeholder: "...",
    readonly: false,
  },
  returnPassword: {
    label: "Encrypted/Decrypted Password",
    name: "returnPassword",
    type: "text",
    placeholder: "...",
    readonly: true,
  },
};

const BASE_CHAR =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>/?|'\"~";

const checkText = (text: string) => {
  for (let i = 0; i < text.length; i++) {
    if (BASE_CHAR.includes(text[i]) == false) {
      return false;
    }
  }
  return true;
};

const Encrypt = () => {
  const [key, setKey] = useState("");
  const [keyErrorMessage, setKeyErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [returnPassword, setReturnPassword] = useState("");

  const [processEncrypt, setProcessEncrypt] = useState(false);
  const [processDecrypt, setProcessDecrypt] = useState(false);

  const [processMessage, setProcessMessage] = useState("");
  const [isProcessSuccess, setIsProcessSuccess] = useState(false);

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    if (event.currentTarget.name == Input.key.name) {
      setKey(event.currentTarget.value);
      setKeyErrorMessage("");
    } else if (event.currentTarget.name == Input.password.name) {
      setPassword(event.currentTarget.value);
      setPasswordErrorMessage("");
    }
  };

  const checkInput = ({ key, password }: { key: string; password: string }) => {
    var ret = true;
    if (!checkText(key)) {
      setKeyErrorMessage("Invalid char, please refer to valid characters list");
      ret = false;
    }
    if (!checkText(password)) {
      setPasswordErrorMessage(
        "Invalid char, please refer to valid characters list"
      );
      ret = false;
    }
    return ret;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = async ({ text }: { text: string }) => {
    const ok = checkInput({ key, password });
    if (!ok) {
      return;
    }
    var res = null;
    if (text == "Encrypt") {
      setProcessEncrypt(true);
      res = await functionPassword({ key, password, type: "encrypt" });
      setProcessEncrypt(false);
    } else {
      setProcessDecrypt(true);
      res = await functionPassword({ key, password, type: "decrypt" });
      setProcessDecrypt(false);
    }
    if (res) {
      setReturnPassword(res.password);
      setIsProcessSuccess(res.ok);
      if (res.ok) {
        setProcessMessage("success");
      } else {
        setProcessMessage("fail");
      }
    }
  };

  return (
    <main className="my--container mx-auto my-10 sm:my20">
      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <InputItem
              value={key}
              isError={Boolean(keyErrorMessage)}
              onChange={handleChange}
              {...Input.key}
            />
            {Boolean(keyErrorMessage) && (
              <div className="text-sm font-medium text-red-600 pt-1">
                {keyErrorMessage}
              </div>
            )}
          </div>
          <div className="col-span-9">
            <InputItem
              value={password}
              isError={Boolean(passwordErrorMessage)}
              onChange={handleChange}
              {...Input.password}
            />
            {Boolean(passwordErrorMessage) && (
              <div className="text-sm font-medium text-red-600 pt-1">
                {passwordErrorMessage}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <LoadingButton
            type="button"
            text="Encrypt"
            className="bg-green-700"
            isLoading={processEncrypt}
            isSuccess={false}
            onClick={handleClick}
          />
          <LoadingButton
            type="button"
            text="Decrypt"
            className="bg-yellow-700"
            isLoading={processDecrypt}
            isSuccess={false}
            onClick={handleClick}
          />
        </div>
        <div>
          <InputItem
            value={returnPassword}
            isError={false}
            onChange={() => {}}
            {...Input.returnPassword}
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

export default Encrypt;
