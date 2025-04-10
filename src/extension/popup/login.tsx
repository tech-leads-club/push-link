export const Login = () => {
  return (
    <>
      <img
        src="public/logo.png"
        alt="Tech Leads Club Logo"
        className="w-[48px] h-auto"
      />

      <div className="login-container" id="loginContainer">
        <h1 className="m-0 font-sans text-white text-xl">
          Para usar a extensão, você precisa estar logado no Tech Leads Club
        </h1>
        <a
          href="https://www.techleads.club"
          target="_blank"
          className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 text-base cursor-pointer"
          id="loginButton"
        >
          Ir para o site e fazer login
        </a>
      </div>
    </>
  );
};
