import fs from 'fs'
import path from 'path'

type Tags = { name: string }

export type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  author?: string
  draft?: boolean
  tags?: Tags
}

export type BlogPost = {
  metadata: Metadata
  slug: string
  content: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  const frontMatterBlock = match ? match![1] : ''
  const content = fileContent.replace(frontmatterRegex, '').trim()

  if (!frontMatterBlock) {
    return { metadata: '', content }
  }
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(': ')
    let value = valueArr.join(': ').trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    const trimmedKey = key.trim() as keyof Metadata

    // Handle boolean values
    if (trimmedKey === 'draft') {
      metadata[trimmedKey] = value.toLowerCase() === 'true'
    } else if (trimmedKey === 'tags') {
      metadata[trimmedKey] = value
        .split(',')
        .map((tag) => tag.trim()) as unknown as Tags
    } else {
      metadata[trimmedKey] = value
    }
  })

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getCraftData() {
  return getMDXData(
    path.join(process.cwd(), 'src', 'app', 'craft', 'components')
  )
}

export function getBlogData() {
  return getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'posts'))
}
