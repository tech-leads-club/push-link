import { useEffect, useReducer } from 'react'
import browser from 'webextension-polyfill'
import { getCurrentPageData } from '../helpers/metadata'
import { publishPost } from '../services/post.service'
import type { ShareFormActions, ShareFormState } from '../types'

export function useShareForm(): [ShareFormState, ShareFormActions] {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const loadPageData = async () => {
      try {
        const storage = await browser.storage.local.get('selectedText')
        const selectedText = typeof storage.selectedText === 'string' ? storage.selectedText : null

        const pageData = await getCurrentPageData()

        if (pageData) {
          if (!pageData.url || !pageData.title) {
            dispatch({
              type: 'LOAD_PAGE_DATA',
              data: {
                url: pageData.url || '',
                title: pageData.title || '',
                note: selectedText || '',
                imageUrl: '',
              },
            })

            await browser.storage.local.remove('selectedText')
            return
          }

          dispatch({
            type: 'LOAD_PAGE_DATA',
            data: {
              url: pageData.url,
              title: pageData.title,
              note: selectedText || (pageData.description ? `${pageData.description}\n\n` : ''),
              imageUrl: pageData.imageUrl ?? '',
            },
          })

          await browser.storage.local.remove('selectedText')
        }
      } catch {
        dispatch({
          type: 'LOAD_PAGE_DATA',
          data: {
            url: '',
            title: '',
            note: '',
            imageUrl: '',
          },
        })
      }
    }

    loadPageData()
  }, [])

  const handleSubmit = async (): Promise<void> => {
    if (state.isPending) return

    try {
      dispatch({ type: 'SET_PENDING', isPending: true })
      dispatch({ type: 'SET_ERROR', error: null })
      dispatch({ type: 'SET_SUCCESS', isSuccess: false })

      const success = await publishPost({
        url: state.url,
        title: state.title,
        note: state.note,
        imageUrl: state.imageUrl,
      })

      if (success) {
        dispatch({ type: 'SET_SUCCESS', isSuccess: true })
        setTimeout(() => {
          window.close()
        }, 2000)
      } else {
        dispatch({ type: 'SET_ERROR', error: 'Falha ao publicar o post' })
      }
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Erro inesperado. Tente novamente ou contate o suporte',
      })
    } finally {
      dispatch({ type: 'SET_PENDING', isPending: false })
    }
  }

  const setField = (field: keyof ShareFormState, value: string | boolean | null) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  return [
    state,
    {
      setTitle: (title: string) => setField('title', title),
      setNote: (note: string) => setField('note', note),
      setUrl: (url: string) => setField('url', url),
      handleSubmit,
    },
  ]
}

type Action =
  | { type: 'SET_FIELD'; field: keyof ShareFormState; value: string | boolean | null }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'SET_PENDING'; isPending: boolean }
  | { type: 'LOAD_PAGE_DATA'; data: Partial<ShareFormState> }
  | { type: 'SET_SUCCESS'; isSuccess: boolean }

const initialState: ShareFormState = {
  url: '',
  title: '',
  note: '',
  imageUrl: '',
  isPending: false,
  error: null,
  isSuccess: false,
}

function reducer(state: ShareFormState, action: Action): ShareFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_ERROR':
      return { ...state, error: action.error }
    case 'SET_PENDING':
      return { ...state, isPending: action.isPending }
    case 'LOAD_PAGE_DATA':
      return { ...state, ...action.data }
    case 'SET_SUCCESS':
      return { ...state, isSuccess: action.isSuccess }
    default:
      return state
  }
}
