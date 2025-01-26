import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  html: string | undefined
}

declare const data: Post[]
export { data }

export default createContentLoader('news/*.md', {
  render: true,
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.date) // filter out posts without a date
      .map(({ url, frontmatter, html }) => ({
        title: frontmatter.title,
        url: frontmatter.permalink || url,
        html,
        date: formatDate(frontmatter.date)
      }))
      .sort((a, b) => b.date.time - a.date.time)
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
}
