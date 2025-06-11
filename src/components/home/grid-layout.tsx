import { motion } from 'motion/react'

export const GridLayout = ({
  showVariant,
  setShowVariant,
}: {
  showVariant: boolean
  setShowVariant: (showVariant: boolean) => void
}) => {
  return (
    <motion.div
      layoutId="wrapper"
      exit={{ duration: 3 }}
      data-closed={showVariant}
      className="group w-[calc(100%-1.5rem)] top-20 left-[0.8rem] absolute"
    >
      <div
        style={{
          boxShadow: !showVariant
            ? 'none'
            : '0px 0px 0px 1px rgba(9, 9, 11, 0.08), 0px 1px 2px -1px rgba(9, 9, 11, 0.08), 0px 2px 4px 0px rgba(9, 9, 11, 0.04)',
        }}
        className="bg-white relative top-0 z-30 w-full rounded-xl h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center"
      >
        <motion.button
          layoutId="play"
          onClick={async () => {
            setShowVariant(false)
          }}
          type="button"
          className="opacity-30 transition-opacity ease-linear hover:opacity-100"
        >
          <svg
            id="Pause"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mx-auto"
          >
            <path
              stroke="#fafafa"
              d="m9,1H2v1h-1v20h1v1h7v-1h1V2h-1v-1Zm-1,2v18H3V3h5Z"
            />
            <path
              stroke="#fafafa"
              d="m22,2v-1h-7v1h-1v20h1v1h7v-1h1V2h-1Zm-1,1v18h-5V3h5Z"
            />
          </svg>
        </motion.button>
      </div>
      <div
        style={
          {
            '--translate-distance': '-105%',
            '--scale-value': '0.95',
          } as React.CSSProperties
        }
        data-card="card-2"
        className="card bg-[#fafafa] absolute -translate-y-[100%] z-20 w-full scale-95 stuff rounded-2xl card h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center"
      >
        some stuff
      </div>
      <div
        style={
          {
            '--translate-distance': '-110%',
            '--scale-value': '0.90',
          } as React.CSSProperties
        }
        data-card="card-3"
        className="card bg-[#fafafa] absolute -translate-y-[100%] w-full scale-90 some-stuff z-10 rounded-xl card h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center"
      >
        some other stuff{' '}
      </div>
    </motion.div>
  )
}
