import { useEffect, useState } from 'react'
import { getCurrentPageData } from '../helpers/metadata'
import { publishPost } from '../services/post.service'
import type { ShareFormActions, ShareFormState } from '../types'

export function useShareForm(): [ShareFormState, ShareFormActions] {
  const [url, setUrl] = useState('https://example.com')
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const loadPageData = async () => {
      const pageData = await getCurrentPageData()

      if (pageData) {
        setUrl(pageData.url)
        setTitle(pageData.title)

        if (pageData.description) {
          setNote(`${pageData.description}\n\n`)
        }

        if (pageData.imageUrl) {
          setImageUrl(pageData.imageUrl)
        }
      }
    }

    loadPageData()
  }, [])

  const handleSubmit = async (): Promise<void> => {
    const success = await publishPost({ url, title, note, imageUrl })

    if (success) {
      // Fechar a janela após um delay
      setTimeout(() => {
        window.close()
      }, 1000)
    }
  }

  return [
    { url, title, note, imageUrl },
    { setTitle, setNote, handleSubmit },
  ]
}
