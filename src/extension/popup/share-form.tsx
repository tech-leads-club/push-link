import { useShareForm } from '../../hooks/useShareForm'

export const ShareForm = () => {
  const [{ url, title, note, imageUrl }, { setTitle, setNote, handleSubmit }] = useShareForm()

  return (
    <>
      <div className="text-center">
        <img src="public/logo.png" alt="Tech Leads Club Logo" className="w-[100px] h-auto" />
      </div>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
            <img
              src={imageUrl}
              alt="Preview"
              className="w-[150px] h-[150px]"
              onError={(e) => {
                const target = e.currentTarget
                target.onerror = null
                target.src = 'https://placehold.co/150'
              }}
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
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
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 font-medium"
        >
          Publicar no Tech Leads Club
        </button>
      </div>
    </>
  )
}
