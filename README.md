# 🚀 Tech Leads Club - Link Push

Extensão de navegador para facilitar o compartilhamento de links na comunidade **Tech Leads Club**.

## ✨ Funcionalidades

- Compartilhe links relevantes diretamente do navegador com poucos cliques.
- Agilize a troca de informações e discussões na comunidade.
- Interface simples e intuitiva.
- Compatível com Google Chrome, Microsoft Edge e Mozilla Firefox.

## 🛠️ Instalação e Build

Este projeto utiliza [`yarn`](https://yarnpkg.com/) ou [`npm`](https://www.npmjs.com/) como gerenciador de pacotes e [`Vite`](https://vitejs.dev/) para build.

### 1. Instale as dependências

```bash
yarn install
npm install
```

### 2. Compile para o navegador desejado

**Para Google Chrome/Microsoft Edge:**

```bash
yarn build:chrome-edge
npm run build:chrome-edge
```

Os arquivos compilados estarão na pasta `dist_chrome`.

**Para Mozilla Firefox:**

```bash
yarn build:firefox
npm run build:firefox
```

Os arquivos compilados estarão na pasta `dist_firefox`.

## 🧑‍💻 Modo de Desenvolvimento

Durante o desenvolvimento, utilize o modo dev para facilitar testes e ver alterações em tempo real. O Vite faz a build automática sempre que você salva um arquivo, tornando o processo muito mais ágil!

**Para Google Chrome/Microsoft Edge:**

```bash
yarn dev:chrome-edge
npm run dev:chrome-edge
```

**Para Mozilla Firefox:**

```bash
yarn dev:firefox
npm run dev:firefox
```

O Vite irá monitorar as alterações e atualizar a build automaticamente.

## 🧩 Como Instalar a Extensão no Navegador (Modo Desenvolvedor)

### Google Chrome

1. Acesse `chrome://extensions/`.
2. Ative o **Modo do desenvolvedor** (canto superior direito).
3. Clique em **Carregar sem compactação**.
4. Selecione a pasta `dist_chrome_edge`.

### Microsoft Edge

1. Acesse `edge://extensions/`.
2. Ative o **Modo do desenvolvedor** (menu lateral esquerdo).
3. Clique em **Carregar sem pacote**.
4. Selecione a pasta `dist_chrome_edge`.

### Mozilla Firefox

1. Acesse `about:debugging#/runtime/this-firefox`.
2. Clique em **Carregar BCP temporário...**.
3. Selecione o arquivo `manifest.json` dentro da pasta `dist_firefox`.

## Erros Comuns

### Não é possível logar no Firefox

Esse é um erro que acontece quando algum outro add-on bloqueia o acesso aos
cookies de sessão do Circle.

Add-ons que causam esse problema:
- [Facebook Container](https://addons.mozilla.org/en-US/firefox/addon/facebook-container/). Solução: nas configurações do add-on, remova o site da comunidade `www.techleads.club` do container.

## 💬 Contribua

Sugestões, melhorias e pull requests são bem-vindos! Sinta-se à vontade para contribuir com o projeto.
