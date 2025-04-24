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
          // TODO: Add links to Chrome Extension Store and Firefox Add-ons
          // {
          //   type: 'paragraph',
          //   content: [
          //     { type: 'text', text: 'Publicado via Link Push' },
          //     {
          //       type: 'text',
          //       marks: [
          //         {
          //           type: 'link',
          //           attrs: { href: '', target: '_blank', rel: 'noopener noreferrer nofollow', class: null },
          //         },
          //       ],
          //       text: 'Saiba mais',
          //     },
          //   ],
          // },
          // { type: 'paragraph', content: [{ type: 'hardBreak' }] },
        ],
      },
    },
    topics: [],
  }
}
