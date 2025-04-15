export const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center space-y-4 h-[400px]">
    <div className="rounded-full bg-green-500 bg-opacity-20 p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-xl font-medium text-gray-300">Publicado com sucesso!</h2>
    <p className="text-gray-500 text-center">Seu conteúdo foi adicionado ao Tech Leads Club</p>
  </div>
)
