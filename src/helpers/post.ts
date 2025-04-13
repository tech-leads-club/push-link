import { SPACE_ID } from '../constants'
import type { PostData } from '../types'

export function createPostBody(title: string, note: string, url: string, coverImage?: string): PostData {
  return {
    id: null,
    space_id: SPACE_ID,
    name: title,
    cover_image: coverImage,
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
        ],
      },
    },
    topics: [],
  }
}
