import { useShareForm } from '../../../../hooks/useShareForm'
import { ShareFormContent } from './ShareFormContent'
import { SuccessMessage } from './SuccessMessage'

export const ShareForm = () => {
  const [{ url, title, note, isPending, error, isSuccess }, { setNote, handleSubmit }] = useShareForm()

  return isSuccess ? (
    <SuccessMessage />
  ) : (
    <ShareFormContent
      url={url}
      title={title}
      note={note}
      isPending={isPending}
      error={error}
      setNote={setNote}
      handleSubmit={handleSubmit}
    />
  )
}
