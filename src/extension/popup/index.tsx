/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import "../global.css";

import { Login } from "./login";
import { ShareForm } from "./share-form";

export const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    try {
      browser.runtime
        .sendMessage({ action: "getCookie" })
        .then(async (response: any) => {
          if (response.success) {
            setIsLoggedIn(true);
            return;
          }
          setIsLoggedIn(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-5 gap-5 text-center">
      {!isLoggedIn ? <Login /> : <ShareForm />}
    </div>
  );
};
