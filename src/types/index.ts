export type ToastPosition = 'top' | 'center' | 'bottom'

export interface InfoRequest {
  action: string
}

export interface TabInfoResponse {
  url?: string
  title?: string
}

export interface GetTokenResponse {
  success: boolean
  token?: string
  error?: string
}

export interface GetCookieResponse {
  success: boolean
  cookies?: Record<string, string>
  error?: string
}

export interface CookieInfo {
  name: string
}

export interface StorageCookies {
  [key: string]: string
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface MessageOptions {
  type: NotificationType
  duration?: number
}

export interface TiptapMark {
  type: string
  attrs?: Record<string, unknown>
}

export interface TiptapContent {
  type: string
  content?: TiptapContent[]
  text?: string
  marks?: TiptapMark[]
}

export interface TiptapDocument {
  type: string
  content: TiptapContent[]
}

export interface PostData {
  id: null
  space_id: number
  name: string
  slug?: string
  body?: string
  cover_image?: string
  is_liking_enabled?: boolean
  is_comments_enabled?: boolean
  topics: number[]
  tiptap_body?: {
    body: TiptapDocument
  }
  sample_user_likes_community_members?: unknown[]
}

export interface PublishPostParams {
  note: string
  imageUrl: string
  url?: string
  title?: string
}

export interface PageMetadata {
  description?: string
  ogDescription?: string
  ogImage?: string
  ogTitle?: string
  title?: string
  twitterDescription?: string
  twitterImage?: string
  twitterTitle?: string
}

export interface PageData {
  url?: string
  title?: string
  description?: string
  imageUrl?: string
}

export type RedaxiosErrorResponse = {
  status: number
  data: { message?: string }
}

export type RedaxiosError = {
  response: RedaxiosErrorResponse
  message: string
}

export interface ShareFormState {
  url: string
  title: string
  note: string
  imageUrl: string
  isPending: boolean
  error: string | null
  isSuccess: boolean
}

export interface ShareFormActions {
  setTitle: (title: string) => void
  setNote: (note: string) => void
  setUrl: (url: string) => void
  handleSubmit: () => Promise<void>
}
