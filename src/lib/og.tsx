import { Resvg } from '@resvg/resvg-js'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import satori from 'satori'

// Runs at build time only.
const size = { width: 800, height: 400 }

// Resolved from the project root: this module is bundled before it runs.
const assets = Promise.all([
  readFile(join(process.cwd(), 'src/fonts/PPEditorialNew-Regular.ttf')),
  readFile(join(process.cwd(), 'src/asset/kehinde-small.png')),
])

/** `large` is the home card: bigger title, sitting lower. */
export async function renderOgImage(title: string, { large = false } = {}) {
  const [font, avatar] = await assets

  const svg = await satori(
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(248,249,250)',
        fontFamily: '"PPEditorialNew-Regular"',
        position: 'relative',
      }}
    >
      <img
        src={`data:image/png;base64,${avatar.toString('base64')}`}
        alt=""
        width={24}
        height={24}
        style={{ borderRadius: '50%', position: 'absolute', right: 40, top: 40 }}
      />
      <h1
        style={{
          color: '#000',
          fontSize: large ? 72 : 60,
          lineHeight: large ? undefined : 1,
          textAlign: 'left',
          letterSpacing: '-0.02em',
          margin: 0,
          paddingLeft: 40,
          marginBottom: large ? 20 : 40,
        }}
      >
        {title}
      </h1>
    </div>,
    {
      ...size,
      fonts: [{ name: 'PPEditorialNew-Regular', data: font, style: 'normal', weight: 400 }],
    }
  )

  return new Resvg(svg).render().asPng()
}
