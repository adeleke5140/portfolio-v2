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
      data-closed={showVariant}
      className="group w-[calc(100%-1.5rem)] top-20 left-[0.8rem] absolute"
    >
      <div className="bg-white border-[0.5px] relative top-0 z-30 w-full rounded-xl h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center">
        <div className="h-[2.2rem] rounded-b-none w-40 border-[0.5px] border-b-0 grid place-items-center absolute bg-white -top-9 left-8 rounded-xl">
          Lab
        </div>
        <motion.button
          layoutId="play"
          onClick={async () => {
            ;``
            setShowVariant(false)
          }}
          type="button"
          className="pt-6 pl-7 origin-center text-black z-30 -left-4 absolute top-[40%] p-2 py-2 rounded font-mono text-xs transition-opacity ease-linear hover:opacity-100"
        >
          vault
        </motion.button>
        <div className="absolute w-[calc(100%-1.5rem)] top-2"></div>
      </div>
      <div
        style={
          {
            '--translate-distance': '-100%',
            '--scale-value': '1',
          } as React.CSSProperties
        }
        data-card="card-2"
        className=" bg-[#fafafa] absolute -translate-y-[100%] z-20 w-full scale-95 stuff rounded-2xl h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center"
      >
        some stuff
      </div>
      <div
        style={
          {
            '--translate-distance': '-100%',
            '--scale-value': '1',
          } as React.CSSProperties
        }
        data-card="card-3"
        className=" bg-[#fafafa] absolute -translate-y-[100%] w-full scale-90 some-stuff z-10 rounded-xl h-[40rem] px-3 py-1 text-sm flex gap-1.5 items-center"
      >
        some other stuff{' '}
      </div>
    </motion.div>
  )
}
