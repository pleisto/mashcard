export function prependHttp(url: string): string {
  const link = url.trim()

  if (/^\.*\/|^(?!localhost)\w+?:/.test(link)) {
    return link
  }

  return link.replace(/^(?!(?:\w+?:)?\/\/)/, 'https://')
}
