export const Login = () => {
  return (
    <div className="max-w-md w-full space-y-6 text-center">
      <div className="text-center">
        <img src="public/logo.png" alt="Tech Leads Club Logo" className="w-[100px] h-auto mx-auto" />
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 h-[360px]">
        <h1 className="text-lg font-medium text-gray-300">
          Para usar a extensão, você precisa estar logado no Tech Leads Club
        </h1>
        <a
          href="https://www.techleads.club"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          Ir para o site e fazer login
        </a>
      </div>
    </div>
  )
}
