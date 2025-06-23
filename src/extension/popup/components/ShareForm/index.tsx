import { useShareForm } from '../../../../hooks/useShareForm'
import { ShareFormContent } from './ShareFormContent'
import { SuccessMessage } from './SuccessMessage'

export const ShareForm = () => {
  const [{ url, title, note, isPending, error, isSuccess }, { setNote, setTitle, setUrl, handleSubmit }] =
    useShareForm()

  return (
    <div className="relative w-full min-h-[400px]">
      <div
        className={`w-full transition-all duration-700 ${
          isSuccess
            ? 'opacity-0 transform scale-95 absolute top-0 left-0 pointer-events-none'
            : 'opacity-100 transform scale-100'
        }`}
      >
        <ShareFormContent
          url={url}
          title={title}
          note={note}
          isPending={isPending}
          error={error}
          setNote={setNote}
          setTitle={setTitle}
          setUrl={setUrl}
          handleSubmit={handleSubmit}
        />
      </div>

      <div
        className={`w-full transition-all duration-700 ${
          !isSuccess
            ? 'opacity-0 transform scale-105 absolute top-0 left-0 pointer-events-none'
            : 'opacity-100 transform scale-100'
        }`}
      >
        <SuccessMessage />
      </div>
    </div>
  )
}
