import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/app/blog/posts')
const craftDirectory = path.join(process.cwd(), 'src/app/craft/components')

type Post = {
  id: string
  [key: string]: any
}

const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    let id = fileName.replace(/\.mdx$/, '')
    if (id.includes('md')) {
      id = id.replace(/\.md$/, '')
    }

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data,
    }
  })
  return allPostsData.sort((a: Post, b: Post) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

const getAllPostsIds = () => {
  const fileNames = fs.readdirSync(postsDirectory)

  const ids = fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })

  return ids
}

const getPostData = async (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}

const getSortedCraftData = () => {
  const fileNames = fs.readdirSync(craftDirectory)
  const allCraftData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(craftDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const matterResult = matter(fileContents)
    
    return {
      id,
      ...matterResult.data,
    }
  })
  
  return allCraftData.sort((a: Post, b: Post) => {
    if (a.date && b.date) {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    }
    return 0
  })
}

export { getSortedPostsData, getAllPostsIds, getPostData, getSortedCraftData }
