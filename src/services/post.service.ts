import axios from 'redaxios'
import SparkMD5 from 'spark-md5'
import { BASE_URL, SPACE_ID } from '../constants'
import { createCookieHeader, getStoredCookies, validateCookies } from '../helpers/cookies'
import { createPostBody } from '../helpers/post'
import type { CoverImageParams, DirectUploadResponse, PublishPostParams } from '../types'
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

    const csrf = await getCsrfTokenFromPage(BASE_URL, cookieHeader)
    if (!csrf) {
      await showNotification('Falha ao obter o token CSRF', 'error')
      return false
    }

    let coverImage = ''
    if (params.imageUrl) {
      const uploadedCover = await uploadCover(params.imageUrl, csrf)
      if (uploadedCover === false) {
        await showNotification('Falha ao enviar a imagem de capa', 'error')
        return false
      }
      coverImage = uploadedCover
    }

    const postData = createPostBody(params.title, params.note, params.url, coverImage)

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

export async function uploadCover(imageUrl: string, csrf: string): Promise<string | false> {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()

    const cookies = await getStoredCookies()

    if (!validateCookies(cookies)) {
      await showNotification('Cookies não encontrados. Por favor, faça login no site www.techleads.club', 'error')
      return false
    }

    const cookieHeader = createCookieHeader(cookies)

    const params: CoverImageParams = {
      filename: 'cover_image.png',
      content_type: blob.type,
      byte_size: blob.size,
      checksum: generateBase64Md5(arrayBuffer),
    }

    const { data } = await axios.post(
      `${BASE_URL}/rails/active_storage/direct_uploads`,
      { blob: params },
      {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          'x-csrf-token': csrf,
          Origin: 'https://www.techleads.club',
          Referer: 'https://www.techleads.club/c/feed-de-noticias/',
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      },
    )
    const directUpload: DirectUploadResponse = data

    await uploadImageToAmazon(directUpload, arrayBuffer)

    return directUpload.signed_id
  } catch (error: unknown) {
    let errorMessage = 'Erro desconhecido ao enviar imagem de capa'

    if (isRedaxiosError(error)) {
      errorMessage = error.response.data.message ?? `Erro na requisição: ${error.response.status}`
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    await showNotification(errorMessage, 'error', 'top-center')
    return false
  }
}

export async function uploadImageToAmazon(data: DirectUploadResponse, imageBuffer: ArrayBuffer): Promise<boolean> {
  const url = data.direct_upload.url
  const headers = data.direct_upload.headers

  try {
    await axios.put(url, imageBuffer, { headers })
    return true
  } catch (error) {
    let errorMessage = 'Erro desconhecido ao enviar imagem de capa'

    if (isRedaxiosError(error)) {
      errorMessage = error.response.data.message ?? `Erro na requisição: ${error.response.status}`
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    await showNotification(errorMessage, 'error', 'top-center')
    return false
  }
}

export function generateBase64Md5(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer)

  let binaryString = ''
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i])
  }

  const hexHash = SparkMD5.hashBinary(binaryString)

  const hexPairs = hexHash.match(/.{2}/g)!
  const byteArray = new Uint8Array(hexPairs.map((h) => parseInt(h, 16)))

  let bin = ''
  byteArray.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

export async function getCsrfTokenFromPage(url: string, cookieHeader: string): Promise<string | null> {
  const response = await axios.get(url, {
    headers: {
      Cookie: cookieHeader,
      Referer: url,
      Origin: new URL(url).origin,
    },
  })

  const html = response.data
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const query = (selector: string, attribute = 'content') => doc.querySelector(selector)?.getAttribute(attribute) ?? ''

  const csrf = query('meta[name="csrf-token"]')
  if (!csrf) {
    return null
  }
  return csrf
}
