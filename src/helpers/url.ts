import { TARGET_DOMAIN } from '../constants'

export function isTargetWebsite(url: string | undefined): boolean {
  return !!url && url.includes(TARGET_DOMAIN)
}

export function removeMarketingParameters(url: string | undefined | null): string | undefined | null {
  if (!url) {
    return url;
  }

  try {
    const urlObject = new URL(url);
    const params = urlObject.searchParams;
    let changed = false;

    MARKETING_PARAMETERS.forEach(param => {
      if (params.has(param)) {
        params.delete(param);
        changed = true;
      }
    });

    if (changed) {
      return urlObject.toString();
    }
    return url; // Return original URL if no parameters were removed
  } catch (error) {
    // Handle potential errors during URL parsing, e.g., invalid URL
    console.error('Error processing URL:', error);
    return url; // Return original URL in case of error
  }
}
