import axios from 'redaxios'
import { BASE_URL, SPACE_ID } from '../constants'
import { createCookieHeader, getStoredCookies, validateCookies } from '../helpers/cookies'
import { createPostBody } from '../helpers/post'
import type { PublishPostParams } from '../types'
import { isRedaxiosError } from '../utils/typeguards'
import { showNotification } from './notification.service'

export async function publishPost(params: PublishPostParams): Promise<boolean> {
  try {
    if (!params.url || !params.title) {
      await showNotification('URL e título são obrigatórios', 'error')
      return false
    }

    const cookies = await getStoredCookies()

    if (!validateCookies(cookies)) {
      await showNotification('Cookies não encontrados. Por favor, faça login no site www.techleads.club', 'error')
      return false
    }

    const cookieHeader = createCookieHeader(cookies)
    const postData = createPostBody(params.title, params.note, params.url)

    await axios.post(
      `${BASE_URL}/internal_api/spaces/${SPACE_ID}/posts`,
      { post: postData },
      { headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } },
    )

    await showNotification('Post publicado com sucesso!', 'success', 'top-center')
    return true
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao publicar post'

    if (isRedaxiosError(error)) {
      errorMessage = error.response.data.message ?? `Erro na requisição: ${error.response.status}`
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    await showNotification(errorMessage, 'error', 'top-center')
    return false
  }
}
