import { getCollection, type CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blog'>
export type CraftItem = CollectionEntry<'craft'>

const hiddenBlogStatuses = new Set(['draft', 'editing', 'archived'])

/** Drafts show up in `astro dev` but are left out of production builds entirely. */
export function isPublishedPost({ data }: BlogPost) {
  return !hiddenBlogStatuses.has(data.status) && !data.draft
}

export function isPublishedCraft({ data }: CraftItem) {
  return data.status !== 'draft'
}

/** Newest first. Same-day posts fall back to id (descending). */
export async function getPosts() {
  const posts = await getCollection('blog', (post) =>
    import.meta.env.DEV ? true : isPublishedPost(post)
  )
  return posts.sort(
    (a, b) => b.data.date.localeCompare(a.data.date) || b.id.localeCompare(a.id)
  )
}

export async function getCraftItems() {
  const items = await getCollection('craft', (item) =>
    import.meta.env.DEV ? true : isPublishedCraft(item)
  )
  return items.sort((a, b) => a.id.localeCompare(b.id))
}

/** [[year, posts], ...], newest year first. Expects posts already sorted. */
export function groupPostsByYear(posts: BlogPost[]) {
  const groups = new Map<number, BlogPost[]>()
  for (const post of posts) {
    const year = Number(post.data.date.slice(0, 4))
    groups.set(year, [...(groups.get(year) ?? []), post])
  }
  return [...groups].sort(([a], [b]) => b - a)
}

/** [[tag, items], ...], tags alphabetically. */
export function groupCraftByTag(items: CraftItem[]) {
  const groups = new Map<string, CraftItem[]>()
  for (const item of items) {
    const tag = item.data.tag ?? 'uncategorized'
    groups.set(tag, [...(groups.get(tag) ?? []), item])
  }
  return [...groups].sort(([a], [b]) => a.localeCompare(b))
}
