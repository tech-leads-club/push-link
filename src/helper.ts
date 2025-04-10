/* eslint-disable @typescript-eslint/no-explicit-any */
import browser from "webextension-polyfill";

export const BASE_URL = "https://www.techleads.club";
export const TARGET_DOMAIN = "techleads.club";
export const SPACE_ID = 1966140;
export const COMMUNITY_ID = 71710;

console.log(SPACE_ID, COMMUNITY_ID);


export interface InfoRequest {
  action: string;
}

export interface TabInfoResponse {
  url?: string;
  title?: string;
  error?: string;
}

export interface GetTokenResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export interface GetCookieResponse {
  success: boolean;
  cookies?: Record<string, string>;
  error?: string;
}

export interface CookieInfo {
  name: string;
}


export interface UserLoggedInResponse {
  success: boolean;
  error?: string;
}

export const REQUIRED_COOKIES: CookieInfo[] = [
  { name: "remember_user_token" },
  { name: "user_session_identifier" },
  { name: "_circle_session" },
];

export interface StorageCookies {
  remember_user_token?: string;
  user_session_identifier?: string;
  _circle_session?: string;
}

export interface MessageOptions {
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

export interface TiptapContent {
  type: string;
  content?: TiptapContent[];
  text?: string;
  marks?: {
    type: string;
    attrs?: Record<string, any>;
  }[];
}

export interface TiptapDocument {
  type: string;
  content: TiptapContent[];
}

export interface PostData {
  id: null;
  space_id: number;
  name: string;
  tiptap_body: {
    body: TiptapDocument;
  };
  sample_user_likes_community_members: any[];
  topics: any[];
}

export function isValidRequest(request: unknown, action: string): request is InfoRequest {
  return (
    typeof request === "object" &&
    request !== null &&
    "action" in request &&
    typeof (request as InfoRequest).action === "string" &&
    (request as InfoRequest).action === action
  );
}

export async function handleTabInfoRequest(): Promise<TabInfoResponse> {
  try {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tabs.length === 0) {
      return { error: "No active tab found" };
    }

    const tab = tabs[0];
    return {
      url: tab.url,
      title: tab.title,
    };
  } catch (error) {
    return {
      error: `Failed to get tab info: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

export function isTargetWebsite(url: string | undefined): boolean {
  return !!url && url.includes(TARGET_DOMAIN);
}


export async function requestAuthToken(): Promise<GetTokenResponse> {
  try {
    const message: InfoRequest = { action: "getCookie" };
    const response = await browser.runtime.sendMessage(message);

    if (!response) {
      return { success: false, error: "Empty response when verifying token" };
    }

    return response as GetTokenResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error verifying token: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

export async function notifyUserLoggedIn(): Promise<UserLoggedInResponse> {
  try {
    const message: InfoRequest = { action: "userLoggedIn" };
    const response = await browser.runtime.sendMessage(message);
    return response as UserLoggedInResponse;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error sending login message: ${errorMessage}`);
    return { success: false, error: errorMessage };
  }
}

export async function handleTabUpdate(
  tabId: number,
  changeInfo: browser.Tabs.OnUpdatedChangeInfoType,
  tab: browser.Tabs.Tab
): Promise<void> {
  if (changeInfo.status === "complete" ) {
    // && isTargetWebsite(tab.url)
    try {
      const tokenResponse = await requestAuthToken();
      if (tokenResponse.success) {
        await notifyUserLoggedIn();
      }
    } catch (error) {
      console.error("Error processing tab update:", error);
    }
  }
}


export async function getCookie(
  cookieInfo: CookieInfo
): Promise<browser.Cookies.Cookie | null> {
  try {
    console.log(JSON.stringify(browser.cookies));
    return browser.cookies.get({
      url: BASE_URL,
      name: cookieInfo.name,
    });
  } catch (error) {
    console.error(`Error fetching cookie ${cookieInfo.name}:`, error);
    return null;
  }
}

export async function handleGetCookieRequest(
  sendResponse: (response: GetCookieResponse) => void
): Promise<void> {
  try {
    const cookiePromises = REQUIRED_COOKIES.map((cookie) => getCookie(cookie));
    const cookieResults = await Promise.all(cookiePromises);

    const cookieData: Record<string, string> = {};
    let validCookiesCount = 0;

    cookieResults.forEach((cookie: { name: string; value: string } | null) => {
      if (cookie) {
        cookieData[cookie.name] = cookie.value;
        validCookiesCount++;
      }
    });

    if (validCookiesCount === REQUIRED_COOKIES.length) {
      await browser.storage.local.set(cookieData);
      sendResponse({ success: true, cookies: cookieData });
    } else {
      sendResponse({
        success: false,
        error: `Cookies not found completely (${validCookiesCount}/${REQUIRED_COOKIES.length})`,
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[GET-COOKIES][ERROR]", errorMessage);
    sendResponse({
      success: false,
      error: `Error processing cookies: ${errorMessage}`,
    });
  }
}

export async function getStoredCookies(): Promise<StorageCookies> {
  try {
    const cookies = await browser.storage.local.get([
      "remember_user_token",
      "user_session_identifier",
      "_circle_session",
    ]);
    return cookies as StorageCookies;
  } catch (error) {
    console.error("Error getting cookies from storage:", error);
    return {};
  }
}

export function validateCookies(cookies: StorageCookies): boolean {
  const { remember_user_token, user_session_identifier, _circle_session } =
    cookies;
  return !!(remember_user_token && user_session_identifier && _circle_session);
}

export function createCookieHeader(cookies: StorageCookies): string {
  return (
    `remember_user_token=${cookies.remember_user_token}; ` +
    `user_session_identifier=${cookies.user_session_identifier}; ` +
    `_circle_session=${cookies._circle_session}`
  );
}

export async function handleNotifications(): Promise<void> {
  try {
    const cookies = await getStoredCookies();

    if (!validateCookies(cookies)) {
      console.log(
        "Cookies não encontrados. Por favor, faça login no site www.techleads.club",
        "error"
      );
      return;
    }

    const cookieHeader = createCookieHeader(cookies);

    const response = await fetch(
      `${BASE_URL}/notifications/new_notifications_count?community_id=${COMMUNITY_ID}`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Erro ao buscar notificações: ${response.status}`
      );
    }

    const notificationsData = await response.json();
    console.log("Notificações obtidas com sucesso:", notificationsData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erro ao buscar notificações:", errorMessage);
    console.log(errorMessage || "Erro ao buscar notificações", "error");
  }
}


// Function that runs in the content script context
export function extractPageMetadata() {
  const query = (selector: string, attribute = "content") =>
    document.querySelector(selector)?.getAttribute(attribute) || "";

  const metadata = {
    // Open Graph metadata
    ogTitle: query('meta[property="og:title"]'),
    ogDescription: query('meta[property="og:description"]'),
    ogImage: query('meta[property="og:image"]'),
    ogUrl: query('meta[property="og:url"]'),
    ogSiteName: query('meta[property="og:site_name"]'),
    ogType: query('meta[property="og:type"]'),

    // Twitter Card metadata
    twitterTitle: query('meta[name="twitter:title"]'),
    twitterDescription: query('meta[name="twitter:description"]'),
    twitterImage: query('meta[name="twitter:image"]'),
    twitterCard: query('meta[name="twitter:card"]'),

    // Standard metadata
    description: query('meta[name="description"]'),
    keywords: query('meta[name="keywords"]'),
    author: query('meta[name="author"]'),

    // Page info
    title: document.title,
    canonicalUrl: query('link[rel="canonical"]', 'href'),
  };

  return metadata;
}

export function createPostBody(
  title: string,
  note: string,
  url: string
): PostData {
  return {
    id: null,
    space_id: SPACE_ID,
    name: title,
    tiptap_body: {
      body: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: note
              ? [
                  {
                    type: "text",
                    text: note,
                  },
                ]
              : undefined,
          },
          {
            type: "paragraph",
          },
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "URL: ",
              },
              {
                type: "text",
                marks: [
                  {
                    type: "link",
                    attrs: {
                      href: url,
                      target: "_blank",
                      rel: "noopener noreferrer nofollow",
                      class: null,
                    },
                  },
                ],
                text: url,
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              {
                type: "hardBreak",
              },
            ],
          },
        ],
      },
    },
    sample_user_likes_community_members: [],
    topics: [],
  };
}
