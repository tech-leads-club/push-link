import { EXTENSION_URLS, SPACE_ID } from '../constants'
import type { PostData, TiptapContent } from '../types'

export function createPostBody(title: string, note: string, url: string): PostData {
  validateInput(title, url)

  const content: TiptapContent[] = []
  const trimmedNote = note?.trim()

  if (trimmedNote) content.push(createParagraph([createTextNode(trimmedNote)]))
  content.push(createParagraph([createTextNode('🔗 '), createLinkNode(url, url)]))

  content.push(
    createParagraph([
      createTextNode('📦 Compartilhado via extensão Push Link: '),
      createLinkNode('Firefox', EXTENSION_URLS.firefox),
      createTextNode(' • '),
      createLinkNode('Chrome', EXTENSION_URLS.chrome),
    ]),
  )

  return {
    id: null,
    space_id: SPACE_ID,
    name: title.trim(),
    tiptap_body: { body: { type: 'doc', content } },
    topics: [],
  }
}

function createTextNode(text: string): TiptapContent {
  return { type: 'text', text }
}

function createLinkNode(text: string, href: string): TiptapContent {
  return {
    type: 'text',
    text,
    marks: [{ type: 'link', attrs: { href, target: '_blank', rel: 'noopener noreferrer nofollow', class: null } }],
  }
}

function createParagraph(content: TiptapContent[]): TiptapContent {
  return { type: 'paragraph', content }
}

function validateInput(title: string, url: string): void {
  const validations: Record<string, { value: string; error: string; validate: (v: string) => boolean }> = {
    title: { value: title, error: 'Título é obrigatório', validate: (v: string) => Boolean(v?.trim()) },
    url: { value: url, error: 'URL é obrigatória', validate: (v: string) => Boolean(v?.trim()) },
  }

  for (const key in validations) {
    const { value, error, validate } = validations[key]
    if (!validate(value)) {
      throw new Error(error)
    }
  }

  try {
    new URL(url)
  } catch {
    throw new Error('URL inválida')
  }
}
