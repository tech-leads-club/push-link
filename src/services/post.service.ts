import axios from 'redaxios'
import { BASE_URL, SPACE_ID } from '../constants'
import { createCookieHeader, validateCookies } from '../helpers/cookies'
import { createPostBody } from '../helpers/post'
import type { PublishPostParams } from '../types'
import { isRedaxiosError } from '../utils/typeguards'
import { getAuthCookies } from './cookies.service'

export async function publishPost(params: PublishPostParams): Promise<boolean> {
  const validationRules: Array<{ condition: boolean; message: string }> = [
    { condition: !params?.url || !params?.title, message: 'URL e título são obrigatórios' },
    {
      condition: (params?.title ?? '').length > 255,
      message: 'Por favor, resuma o título para deixá-lo mais objetivo.',
    },
    {
      condition: params?.title?.trim().length === 0,
      message: 'O título não pode estar vazio ou conter apenas espaços.',
    },
  ]

  for (const rule of validationRules) {
    if (rule.condition) throw new Error(rule.message)
  }

  const title: string = params.title as string
  const url: string = params.url as string
  const note: string = params.note ?? ''

  const cookies = await getAuthCookies()

  if (!validateCookies(cookies)) {
    throw new Error('Cookies não encontrados. Por favor, faça login no site www.techleads.club')
  }

  const cookieHeader = createCookieHeader(cookies)
  const postData = createPostBody(title, note, url)

  try {
    await axios.post(
      `${BASE_URL}/internal_api/spaces/${SPACE_ID}/posts`,
      { post: postData },
      { headers: { 'Content-Type': 'application/json', Cookie: cookieHeader } },
    )
    return true
  } catch (error: unknown) {
    if (isRedaxiosError(error)) {
      const statusCode = error.response?.status
      const responseMessage = error.response?.data?.message

      const errorMessages: Record<number, string> = {
        401: 'Não autorizado. Por favor, faça login no site www.techleads.club',
        403: 'Acesso negado. Verifique suas permissões no site',
        413: 'Conteúdo muito grande. Reduza o tamanho do título ou nota',
        422: 'Dados inválidos. Verifique o título e URL',
      }

      if (statusCode && errorMessages[statusCode]) throw new Error(errorMessages[statusCode])
      if (statusCode && statusCode >= 500) throw new Error('Erro no servidor. Tente novamente em alguns minutos')
      throw new Error(responseMessage ?? `Erro na requisição (${statusCode}). Tente novamente`)
    } else if (error instanceof Error) {
      throw error
    } else {
      throw new Error('Falha na conexão ou erro inesperado. Verifique sua internet e tente novamente')
    }
  }
}
