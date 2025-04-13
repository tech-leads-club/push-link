export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center'

export interface InfoRequest {
  action: string
}

export interface TabInfoResponse {
  url?: string
  title?: string
  error?: string
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

export interface UserLoggedInResponse {
  success: boolean
  error?: string
}

export interface StorageCookies {
  remember_user_token?: string
  user_session_identifier?: string
  _circle_session?: string
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface MessageOptions {
  type: NotificationType
  duration?: number
}

export interface TiptapContent {
  type: string
  content?: TiptapContent[]
  text?: string
  marks?: {
    type: string
    attrs?: Record<string, unknown>
  }[]
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

export interface CoverImageParams {
  filename: string
  content_type: string
  byte_size: number
  checksum?: string
}

export interface DirectUploadResponse {
  id: number
  key: string
  filename: string
  content_type: string
  metadata: Record<string, any>
  byte_size: number
  checksum: string
  created_at: string
  service_name: string
  attachable_sgid: string
  signed_id: string
  direct_upload: {
    url: string
    headers: {
      'Content-Type': string
      'Content-MD5': string
      'Content-Disposition': string
    }
  }
}

export interface PublishPostParams {
  url: string
  title: string
  note: string
  imageUrl: string
}

export interface PageMetadata {
  ogTitle?: string
  twitterTitle?: string
  ogDescription?: string
  twitterDescription?: string
  ogImage?: string
  twitterImage?: string
}

export interface PageData {
  url: string
  title: string
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
}

export interface ShareFormActions {
  setTitle: (title: string) => void
  setNote: (note: string) => void
  handleSubmit: () => Promise<void>
}
