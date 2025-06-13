import { TARGET_DOMAIN } from '../constants'

export function isTargetWebsite(url: string | undefined): boolean {
  return !!url && url.includes(TARGET_DOMAIN)
}

const MARKETING_PARAMS = [
  // UTM / GA4
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  // Ads click IDs
  'gclid',
  'gclsrc',
  'dclid',
  'gbraid',
  'wbraid',
  'fbclid',
  'msclkid',
  'ttclid',
  'twclid',
  'yclid',
  'yadclid',
  'ysclid',
  'li_fat_id',
  // Marketing automation / CRM
  'hsa_acc',
  'hsa_cam',
  'hsa_grp',
  'hsa_ad',
  'hsa_src',
  'hsa_net',
  'hsa_ver',
  '_hsenc',
  '_hsmi',
  '__hssc',
  '__hstc',
  'hsCtaTracking',
  'mkt_tok',
  'mc_cid',
  'mc_eid',
  'mc_tc',
  // Analytics self-hosted
  'pk_campaign',
  'pk_kwd',
  'mtm_campaign',
  'mtm_kwd',
] as const

export function removeMarketingParams(url: string): string {
  try {
    const cleaned = new URL(url)
    MARKETING_PARAMS.forEach((param) => cleaned.searchParams.delete(param))
    return cleaned.toString()
  } catch {
    return url
  }
}
