import { SPACE_ID } from '../constants'
import type { PostData } from '../types'

export function createPostBody(title: string, note: string, url: string): PostData {
  return {
    id: null,
    space_id: SPACE_ID,
    name: title,
    tiptap_body: {
      body: {
        type: 'doc',
        content: [
          { type: 'paragraph', content: note ? [{ type: 'text', text: note }] : undefined },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Link: ' },
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: url, target: '_blank', rel: 'noopener noreferrer nofollow', class: null },
                  },
                ],
                text: url,
              },
            ],
          },
          { type: 'paragraph', content: [{ type: 'hardBreak' }] },
          {
            type: 'paragraph',
            content: [
              { type: 'text', text: 'Publicado via Push Link: ' },
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: { href: '', target: '_blank', rel: 'noopener noreferrer nofollow', class: null },
                  },
                ],
                text: 'Firefox',
              },
              { type: 'text', text: ', ' },
              {
                type: 'text',
                marks: [
                  {
                    type: 'link',
                    attrs: {
                      href: 'https://chromewebstore.google.com/detail/techleadsclub-push-link/opdkcagikdagcabfckgidpkmcibphjlc?authuser=1&hl=en',
                      target: '_blank',
                      rel: 'noopener noreferrer nofollow',
                      class: null,
                    },
                  },
                ],
                text: 'Chrome',
              },
            ],
          },
          { type: 'paragraph', content: [{ type: 'hardBreak' }] },
        ],
      },
    },
    topics: [],
  }
}
