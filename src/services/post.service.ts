import axios from 'redaxios'
import { BASE_URL, SPACE_ID } from '../constants'
import { createCookieHeader, validateCookies } from '../helpers/cookies'
import { createPostBody } from '../helpers/post'
import type { PublishPostParams } from '../types'
import { isRedaxiosError } from '../utils/typeguards'
import { getAuthCookies } from './cookies.service'

export async function publishPost(params: PublishPostParams): Promise<boolean> {
  if (!params.url || !params.title) throw new Error('URL e título são obrigatórios')

  const cookies = await getAuthCookies()

  if (!validateCookies(cookies)) {
    throw new Error('Cookies não encontrados. Por favor, faça login no site www.techleads.club')
  }

  const cookieHeader = createCookieHeader(cookies)
  const postData = createPostBody(params.title, params.note, params.url)

  try {
    await axios.post(
      `${BASE_URL}/internal_api/spaces/${SPACE_ID}/posts`,
      { post: postData },
      { headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } },
    )
    return true
  } catch (error: unknown) {
    if (isRedaxiosError(error)) {
      throw new Error(error.response.data.message ?? `Erro na requisição: ${error.response.status}`)
    } else if (error instanceof Error) {
      throw error
    } else {
      throw new Error('Erro desconhecido ao publicar post')
    }
  }
}
