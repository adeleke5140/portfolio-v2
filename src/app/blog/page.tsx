import { PageWrapper } from '@/components/page-wrapper'
import { formatDate } from '@/helpers/formatDate'
import { getSortedPostsData } from '@/lib/posts'
import Link from 'next/link'

const isDevelopment = process.env.NODE_ENV === 'development'

export const metadata = {
  title: 'Blog',
  description: "Kehinde Adeleke's blog",
  openGraph: {
    title: 'Blog',
    description: "Kehinde Adeleke's blog",
    type: 'website',
    url: 'https://kehinde.xyz/blog',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Blog')}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: "Kehinde Adeleke's blog",
  },
}

function getYearFromDate(dateString?: string): number {
  if (!dateString) return 2025

  const date = new Date(dateString)
  return date.getFullYear()
}

export type Post = {
  id: string
  date?: string
  title?: string
  status?: string
  language?: string
}

const Index = () => {
  const allPostsData = getSortedPostsData() as Array<Post>

  const filteredPosts = allPostsData
    .filter((post) => {
      if (isDevelopment) {
        return post
      } else {
        if (
          post.status !== 'draft' &&
          post.status !== 'editing' &&
          post.status !== 'archived'
        ) {
          return post
        }
      }
    })
    .map((post) => ({
      ...post,
      year: getYearFromDate(post.date),
    }))
    .reverse()
    .reduce((acc, curr) => {
      if (!acc[curr.year]) {
        acc[curr.year] = []
      }
      acc[curr.year].push(curr)
      return acc
    }, {} as Record<string, Post[]>)

  const sortedPostsByYear = Object.entries(filteredPosts).sort(
    ([a], [b]) => parseInt(b) - parseInt(a)
  )

  return (
    <PageWrapper heading="Blog" showHeading>
      <section className="flex flex-col">
        {sortedPostsByYear.map(([year, posts]) => (
          <div
            key={year}
            className=" last:border-b-0 pt-10 first:pt-0 border-b-[0.5px] border-b-[#dcdcdc]"
          >
            <p className="text-sm mb-4 text-ken-grey">{year}</p>
            <div>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group rounded-md py-2 block mb-2 transition-colors duration-200"
                >
                  <div className="flex md:flex-row md:justify-between group-hover:translate-x-2 flex-col gap-1 transition-transform">
                    <p className="hover:underline transition-all">
                      {post.title}
                    </p>
                    <span className="text-sm text-ken-grey">
                      {formatDate(
                        post.date || Date.now().toString(),
                        'LLL d, yyyy'
                      )}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageWrapper>
  )
}

export default Index
