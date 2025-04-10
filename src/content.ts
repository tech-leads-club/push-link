import browser from "webextension-polyfill";

browser.runtime.sendMessage({ action: "getCookie" });


const session = localStorage.getItem("_circle_session");
if (session) {
  browser.runtime.sendMessage({ token: session }).then((response) => {
    console.log("Response background:", response);
  });
} else {
  console.log("Cookie not found in localStorage");
}