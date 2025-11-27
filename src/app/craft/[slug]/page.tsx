import { getCraftData } from '@/app/blog/utils'
import { formatDate } from '@/helpers/formatDate'
import { CardAnimation } from '@/components/craft/card-animation/card-animation'
import { CraftContainer } from '@/components/craft/craft-items/craft-container'
import { Tabs } from '@/components/craft/exclusion-tabs/tabs'
import { IntegrationMenu } from '@/components/craft/integration-menu/integration-menu'
import { RecaptchaButton } from '@/components/craft/recaptcha/recaptcha-button'
import { SplitToEdit } from '@/components/craft/split-to-edit/split-to-edit'
import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/page-wrapper'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(
    process.cwd(),
    'src/app/craft/components',
    `${slug}.mdx`
  )

  try {
    const content = await fs.readFile(mdxPath, 'utf8')
    const data = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
      },
    })

    const frontmatter = data.frontmatter as {
      title: string
      date: string
      description?: string
    }

    return {
      title: frontmatter.title,
      description:
        frontmatter.description ||
        `Explore ${frontmatter.title} - UI craft by Kenny`,
      openGraph: {
        title: frontmatter.title,
        description:
          frontmatter.description ||
          `Explore ${frontmatter.title} - UI craft by Kenny`,
        type: 'website',
        url: `https://kehinde.xyz/craft/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description:
          frontmatter.description ||
          `Explore ${frontmatter.title} - UI craft by Kenny`,
      },
    }
  } catch (error) {
    return {
      title: 'Craft',
      description: 'UI playground by Kenny',
    }
  }
}

export async function generateStaticParams() {
  const data = getCraftData()

  return data.map((craft) => ({
    slug: craft.slug,
  }))
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(
    process.cwd(),
    'src/app/craft/components',
    `${slug}.mdx`
  )

  const content = await fs.readFile(mdxPath, 'utf8')
  const data = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      CraftContainer,
      CardAnimation,
      Tabs,
      IntegrationMenu,
      RecaptchaButton,
      SplitToEdit,
      ...components,
    },
  })
  const craftFrontMatter = data.frontmatter as { title: string; date: string }
  return (
    <PageWrapper
      heading={
        <div className="py-10 pt-24 border-b border-[#dcdcdc7e] pb-6">
          <span className="text-ken-grey text-[15px]">
            {formatDate(craftFrontMatter.date)}
          </span>
          <h1
            style={{
              textWrap: 'pretty',
            }}
            className="leading-[1.2em] text-[40px]  lg:tracking-[-.06em] tracking-[-0.96px]"
          >
            {craftFrontMatter.title}
          </h1>
        </div>
      }
      showHeading
    >
      <div className="max-w-[680px] mx-auto">{data.content}</div>
    </PageWrapper>
  )
}
