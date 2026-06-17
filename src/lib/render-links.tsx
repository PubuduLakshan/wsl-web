import type { ReactNode } from 'react'

const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g

export function renderTextWithLinks(
  text: string,
  linkClassName = 'text-primary underline hover:text-primary-dark'
): ReactNode {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  markdownLinkRegex.lastIndex = 0

  while ((match = markdownLinkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const [, label, url] = match
    if (/^https?:\/\//i.test(url)) {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>
      )
    } else {
      parts.push(match[0])
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
