# Tech Leads Club - Link Push

## Sobre o Projeto

Esta é uma extensão de navegador criada para facilitar o compartilhamento de links dentro da comunidade Tech Leads Club.
A extensão permite que os membros compartilhem links relevantes diretamente pelo navegador, agilizando a troca de informações e discussões na comunidade.

## Como Fazer o Build da Extensão

Este projeto utiliza `yarn` como gerenciador de pacotes e `vite` para o build. Siga os passos abaixo para compilar a extensão:

1.  **Instale as dependências:**
    ```bash
    yarn install
    ```

2.  **Compile a extensão para o navegador desejado:**

    *   **Para Google Chrome:**
        ```bash
        yarn build:chrome
        ```
        Os arquivos compilados estarão na pasta `dist_chrome`.

    *   **Para Mozilla Firefox:**
        ```bash
        yarn build:firefox
        ```
        Os arquivos compilados estarão na pasta `dist_firefox`.

## Como Instalar a Extensão (Modo Desenvolvedor)

Após compilar a extensão, você pode carregá-la no seu navegador em modo desenvolvedor:

### Google Chrome

1.  Abra o Chrome e acesse `chrome://extensions/`.
2.  Ative o "Modo do desenvolvedor" no canto superior direito.
3.  Clique em "Carregar sem compactação".
4.  Selecione a pasta `dist_chrome` gerada no passo de build.

### Mozilla Firefox

1.  Abra o Firefox e acesse `about:debugging#/runtime/this-firefox`.
2.  Clique em "Carregar BCP temporário...".
3.  Navegue até a pasta `dist_firefox` e selecione o arquivo `manifest.json` dentro dela.

Agora a extensão deve estar instalada e pronta para uso/teste.