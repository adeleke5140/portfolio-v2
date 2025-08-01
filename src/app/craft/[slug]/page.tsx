import { getCraftData } from '@/app/blog/utils'
import { IntegrationMenu } from '@/components/craft/integration-menu/integration-menu'
import { CardAnimation } from '@/components/craft/card-animation/card-animation'
import { CraftContainer } from '@/components/craft/craft-items/craft-container'
import { Tabs } from '@/components/craft/exclusion-tabs/tabs'
import { RecaptchaButton } from '@/components/craft/recaptcha/recaptcha-button'
import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/pageWrapper'
import { formatDate } from '@/helpers/formatDate'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

export const metadata = {
  title: 'Craft',
  description: 'UI playground',
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
      ...components,
    },
  })
  const craftFrontMatter = data.frontmatter as { title: string; date: string }
  return (
    <PageWrapper
      heading={
        <div>
          <h1 className="font-inter text-[48px] font-semibold tracking-tight">
            {craftFrontMatter.title}
          </h1>
        </div>
      }
      path="/craft"
      backText="Craft"
      showHeading
      showLink
    >
      {data.content}
    </PageWrapper>
  )
}
