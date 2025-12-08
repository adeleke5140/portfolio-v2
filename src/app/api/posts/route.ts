import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const POSTS_DIRECTORY = path.join(process.cwd(), 'src/app/blog/posts')

function getAllPostFiles() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
}

export async function GET() {
  try {
    const files = getAllPostFiles()

    const posts = files
      .map((file) => {
        const filePath = path.join(POSTS_DIRECTORY, file)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        const slug = file.replace(/\.(md|mdx)$/, '')

        return {
          slug,
          title: data.title || slug,
          description: data.description || '',
          date: data.date || '',
          status: data.status || 'unknown',
          tag: data.tag || '',
          language: data.language || '',
        }
      })
      .sort(
        (a, b) =>
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      )
      .filter((post) => post.status !== 'draft')

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to read blog posts' },
      { status: 500 }
    )
  }
}
