import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const size = {
  width: 800,
  height: 400,
}

export const contentType = 'image/png'

export default async function Image() {
  const ppEditorialNew = await readFile(
    join(process.cwd(), 'src/fonts/PPEditorialNew-Regular.ttf')
  )
  const imageMetadata = await readFile(
    join(process.cwd(), 'src/asset/kehinde-small.png')
  )

  const imageArrayBuffer = imageMetadata.buffer.slice(
    imageMetadata.byteOffset,
    imageMetadata.byteOffset + imageMetadata.byteLength
  )

  return new ImageResponse(
    (
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
          src={imageArrayBuffer as unknown as string}
          alt=""
          width="24"
          height="24"
          style={{
            borderRadius: '50%',
            position: 'absolute',
            right: 40,
            top: 40,
          }}
        />
        <h1
          style={{
            color: '#000',
            fontSize: '72px',
            textAlign: 'left',
            letterSpacing: '-0.02em',
            margin: 0,
            paddingLeft: 40,
            marginBottom: 20,
          }}
        >
          Kehinde Adeleke
        </h1>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'PPEditorialNew-Regular',
          data: ppEditorialNew,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
