import { useEffect } from 'react'
import { showNotification } from '../../../../services/notification.service'

export const ShareFormContent = ({
  url,
  title,
  note,
  isPending,
  error,
  setNote,
  setTitle,
  setUrl,
  handleSubmit,
}: ShareFormContentProps) => {
  useEffect(() => {
    if (error) {
      showNotification(error, 'error')
    }
  }, [error])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full mb-6">
        <img src="public/logo.png" alt="Tech Leads Club Logo" className="w-[100px] h-auto" />
      </div>

      <div className="w-full space-y-6">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <span className="w-12 text-gray-500">Título</span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="Título da página"
            />
          </div>
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
              onChange={(e) => setUrl(e.target.value)}
              disabled={isPending}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-300 disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="URL da página"
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

        <button
          onClick={handleSubmit}
          disabled={isPending || !url.trim() || !title.trim()}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-blue-600"
        >
          {isPending ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </div>
  )
}

interface ShareFormContentProps {
  url: string
  title: string
  note: string
  isPending: boolean
  error: string | null
  setNote: (note: string) => void
  setTitle: (title: string) => void
  setUrl: (url: string) => void
  handleSubmit: () => Promise<void>
}
