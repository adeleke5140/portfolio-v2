import { PageWrapper } from '@/components/page-wrapper'
import { getSortedCraftData } from '@/lib/posts'
import Link from 'next/link'

export const metadata = {
  title: 'Craft',
  description: 'Craft components',
}

export type CraftItem = {
  id: string
  title?: string
  tag?: string
  date?: string
  description?: string
  status?: 'draft' | 'ready-to-go' | 'archived'
  isNew?: boolean
}

const filterIfProd = (data: Array<CraftItem>) => {
  if (process.env.NODE_ENV == 'production') {
    return data.filter((item) => item.status !== 'draft')
  }
  return data
}

export default function Index() {
  const allCraftData = filterIfProd(getSortedCraftData()) as Array<CraftItem>

  const craftsByCategory = allCraftData.reduce(
    (acc, craft) => {
      const category = craft.tag || 'uncategorized'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(craft)
      return acc
    },
    {} as Record<string, CraftItem[]>
  )

  const sortedCategories = Object.entries(craftsByCategory).sort(([a], [b]) =>
    a.localeCompare(b)
  )

  return (
    <PageWrapper heading="Craft" showHeading>
      <section className="flex flex-col">
        {sortedCategories.map(([category, crafts]) => (
          <div
            key={category}
            className="grid md:grid-cols-2 last:border-b-0  pt-10 first:pt-0 border-b-[0.5px] border-b-[#dcdcdc]"
          >
            <p className="font-serif mb-4 capitalize text-lg text-ken-grey">
              {category}
            </p>
            <div>
              {crafts.map((craft) => (
                <Link
                  href={`/craft/${craft.id}`}
                  key={craft.id}
                  className="pb-7 group hover:bg-gray-100 rounded-md py-4 block mb-2 transition-colors duration-200 "
                >
                  <div className="flex group-hover:translate-x-2 flex-col gap-1 transition-transform ">
                    <p className="flex gap-2 items-center">
                      <span className="text-lg  hover:underline  transition-all">
                        {craft.title}
                      </span>
                      <span>{craft.isNew ? <NewBadge /> : ''}</span>
                    </p>
                    {craft.description && (
                      <p className="text-sm text-ken-grey">
                        {craft.description}
                      </p>
                    )}
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

function NewBadge() {
  return (
    <span className="bg-gray-100 text-[var(--primary)] group-hover:bg-white transition-colors font-medium px-2 py-0.5 rounded-lg text-xs">
      new
    </span>
  )
}
