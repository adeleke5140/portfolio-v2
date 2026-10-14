import { getCraftItems, getPosts } from '@/lib/content'
import { renderOgImage } from '@/lib/og'
import type { APIRoute, GetStaticPaths } from 'astro'

// One card per page: /og/home.png, /og/blog.png, /og/blog/<id>.png, ...
export const getStaticPaths = (async () => {
  const [posts, crafts] = await Promise.all([getPosts(), getCraftItems()])
  return [
    { params: { route: 'home' }, props: { title: 'Kehinde Adeleke', large: true } },
    { params: { route: 'blog' }, props: { title: 'Blog' } },
    { params: { route: 'craft' }, props: { title: 'Craft' } },
    ...posts.map((post) => ({
      params: { route: `blog/${post.id}` },
      props: { title: post.data.title },
    })),
    ...crafts.map((item) => ({
      params: { route: `craft/${item.id}` },
      props: { title: item.data.title },
    })),
  ]
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.title, { large: props.large })
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } })
}
