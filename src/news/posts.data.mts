import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { ContentData, createContentLoader } from 'vitepress'

const hostname: string = 'https://www.naemon.io'

interface Post {
  title: string
  url:   string
  date: {
    time:   number
    string: string
    date:   Date
  }
  html:    string
  excerpt: string
}

let data: Post[] = []
export { data }

// write news feed from news folder
async function buildPosts(): Promise<Post[]> {
    const feed = new Feed({
      title: 'Naemon',
      description: 'Naemon news blog',
      id: hostname,
      link: hostname,
      language: 'en',
      image: `${hostname}/public/images/logo/logo_small.png`,
      favicon: `${hostname}/public/favicon.ico`,
      copyright:
        'Copyright (c) 2025-present, Naemon Team'
    })

    data = await createContentLoader('news/*.md', {
      excerpt: true,
      render: true,
      transform(raw): Post[] {
        return raw
          .filter(({ frontmatter }) => frontmatter.date) // filter out posts without a date
          .map(({ url, frontmatter, html }) => ({
            title: frontmatter.title || '',
            url: frontmatter.permalink || url,
            html: html || '',
            excerpt: html || '',
            date: formatDate(frontmatter.date)
          }))
          .sort((a, b) => b.date.time - a.date.time)
      }
    }).load()

    let i = 0;
    for (const post of data) {
      i++;
      if (i > 20) {
        break;
      }
      feed.addItem({
        title: post.title,
        id: `${hostname}${post.url}`,
        link: `${hostname}${post.url}`,
        description: post.excerpt,
        content: post.html,
        author: [
          {
            name: 'Naemon Team',
            email: 'team@naemon.io',
            link: hostname
          }
        ],
        date: post.date.date
      })
    }

    await writeFileSync(path.join(__dirname, '../public/news/feed.xml'), feed.rss2())

    return data
}

function formatDate(raw: string): Post['date'] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        date:  date,
        time: +date,
        string: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
}

export default {
  async load() {
    return await buildPosts();
  }
}