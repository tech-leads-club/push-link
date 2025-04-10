import browser from "webextension-polyfill";
import { handleGetCookieRequest, handleTabInfoRequest, handleTabUpdate, isValidRequest } from "./helper";

browser.tabs.onUpdated.addListener(handleTabUpdate);

browser.runtime.onInstalled.addListener(function () {
  console.log("Tech Leads Club - Links Share extension installed");
});

browser.runtime.onMessage.addListener(
  (request: unknown, _sender, sendResponse) => {
    if (isValidRequest(request, "getCookie")) {
      handleGetCookieRequest(sendResponse).catch((error) => {
        console.error("Unhandled error:", error);
        sendResponse({
          success: false,
          error: "Internal error processing request",
        });
      });
      return true;
    } else if (isValidRequest(request, 'getToken')) {
      handleTabInfoRequest()
        .then(sendResponse)
        .catch((error) => {
          sendResponse({ error: `Unexpected error: ${error.message}` });
        });
    } else {
      sendResponse({ error: "Invalid request" });
    }
    return true;
  }
);