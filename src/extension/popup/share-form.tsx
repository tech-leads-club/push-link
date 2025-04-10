/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import browser from "webextension-polyfill";
import { BASE_URL, createCookieHeader, createPostBody, extractPageMetadata, getStoredCookies, handleNotifications, SPACE_ID, validateCookies } from "../../helper";

export const ShareForm = () => {
  const [url, setUrl] = useState("https://example.com");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("https://placehold.co/150");

  const handleForm = async () => {
    // Validate
    // --
    // Submit
    await handlePublish({ url, title, note, imageUrl });   
  };

  // const showMessage = (
  //   message: string,
  //   type: MessageOptions["type"],
  //   duration: number = 3000
  // ) => {
  //   // Implementação da função para mostrar mensagens na UI
  //   console.log(`[${type.toUpperCase()}] ${message}`);

  //   // Aqui você implementaria a lógica para mostrar a mensagem na UI
  //   const messageElement = document.getElementById("message-container");
  //   if (messageElement) {
  //     messageElement.textContent = message;
  //     messageElement.className = `message ${type}`;
  //     messageElement.style.display = "block";

  //     setTimeout(() => {
  //       messageElement.style.display = "none";
  //     }, duration);
  //   }
  // };

  useEffect(() => {
    loadCurrentTab();
    handleNotifications()
  }, []);

  const loadCurrentTab = () => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then((tabs: any) => {
        const currentTab = tabs[0] || { id: 0 };

        if (!currentTab) return;

        browser.scripting
          .executeScript({
            target: { tabId: currentTab.id },
            func: extractPageMetadata,
          })
          .then((results: any) => {
            if (browser.runtime.lastError) {
              console.error(browser.runtime.lastError);
              return;
            }

            const [metadata] = results;
            const { result } = metadata;

            setUrl(currentTab.url);

            setTitle(
              result.ogTitle || result.twitterTitle || currentTab.title
            );

            if (result.ogDescription || result.twitterDescription) {
              setNote(
                `${result.ogDescription || result.twitterDescription}\n\n`
              );
            }

            const imageUrl = result.ogImage || result.twitterImage;
            if (imageUrl) {
              setImageUrl(imageUrl);
            }
          });
      });
  };

  const handlePublish = async (params: {
    url: string,
    title: string,
    note: string,
    imageUrl: string,
  }): Promise<void> => {
    try {
      if (!params.url || !params.title) {
        console.log("URL e título são obrigatórios", "error");
        return;
      }

      const cookies = await getStoredCookies();

      if (!validateCookies(cookies)) {
        console.log(
          "Cookies não encontrados. Por favor, faça login no site www.techleads.club",
          "error"
        );
        return;
      }

      const cookieHeader = createCookieHeader(cookies);
      const postData = createPostBody(params.title, params.note, params.url);

      const response = await fetch(
        `${BASE_URL}/internal_api/spaces/${SPACE_ID}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieHeader,
          },
          body: JSON.stringify({ post: postData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Erro na requisição: ${response.status}`
        );
      }

      // Mostrar mensagem de sucesso
      console.log("Post publicado com sucesso!", "success");

      // Fechar a janela após um delay
      setTimeout(() => {
        window.close();
      }, 2000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Erro ao publicar:", errorMessage);
      console.log(errorMessage || "Erro ao publicar post", "error");
    }
  };

  return (
    <>
      <div className="text-center">
        <img
          src="public/logo.png"
          alt="Tech Leads Club Logo"
          className="w-[100px] h-auto"
        />
      </div>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {imageUrl && (
          <div className="flex justify-center">
            <img src={imageUrl} alt="Preview" className="w-[150px] h-[150px]" />
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Nota (opcional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleForm}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          Publicar no Tech Leads Club
        </button>
      </div>
    </>
  );
};
