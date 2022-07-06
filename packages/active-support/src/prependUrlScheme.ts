import { isEmail } from './isType'

export function prependUrlScheme(url: string): string {
  const link = url.trim()

  // check if starts with a url scheme
  if (/^[\w-\\.]+:/.test(link)) {
    return link
  }

  // check email format
  if (isEmail(link)) {
    return link.replace(/^(?!(?:\w+?:))/, 'mailto:')
  }

  // check url
  if (!/^\.*\/|^(?!localhost)\w+?:/.test(link)) {
    return link.replace(/^(?!(?:\w+?:)?\/\/)/, 'http://')
  }

  return link
}
