export const ShareFormContent = ({
  url,
  title,
  note,
  isPending,
  error,
  setNote,
  handleSubmit,
}: ShareFormContentProps) => (
  <>
    <div className="text-center">
      <img src="public/logo.png" alt="Tech Leads Club Logo" className="w-[100px] h-auto" />
    </div>

    <div className="max-w-md w-full space-y-6">
      <div className="border-b border-gray-700 pb-2">
        <h2 className="text-sm font-medium text-gray-300">{title}</h2>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <div className="w-4 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <span className="w-12 text-gray-500">URL</span>
          </div>
          <input
            type="text"
            value={url}
            readOnly
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none text-gray-500 cursor-not-allowed hover:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <div className="w-4 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <span className="w-12 text-gray-500">Nota</span>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isPending}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md h-32 resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
          placeholder="Adicione uma nota (opcional)"
        />
      </div>

      {error && <div className="text-red-400 text-sm mt-2 break-words">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-blue-600"
      >
        {isPending ? 'Publicando...' : 'Publicar'}
      </button>
    </div>
  </>
)

interface ShareFormContentProps {
  url: string
  title: string
  note: string
  isPending: boolean
  error: string | null
  setNote: (note: string) => void
  handleSubmit: () => Promise<void>
}
