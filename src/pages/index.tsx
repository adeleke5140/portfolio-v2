import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.6,
    },
  },
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Kehinde Adeleke</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-4"
      >
        <motion.div
          variants={item}
          className="bg-gray-100/40 p-1 rounded-lg border border-gray-100/90"
        >
          <div className="p-3 rounded-lg bg-[#fefefe]">
            <p className="font-medium inline-flex gap-1 items-center">
              Kehinde
            </p>
            <p className="text-sm">Rustacean 🦀, Design engineer 🦄</p>
            <br />
            <p className="text-sm">
              Currently at{' '}
              <span className="text-purple-500 font-serif font-medium">
                mastra.ai
              </span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className=" bg-gray-100/40 border rounded-lg p-1 border-gray-100/90 text-sm row-start-2"
        >
          <p className="p-3 bg-[#fefefe] rounded-lg h-full">
            I am drawn to design because of beauty. <br /> <br /> I also like
            Rust because of a different kind of beauty or perhaps marvel. Marvel
            about how computing can yield so much.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="border col-start-2 p-1 bg-gray-100/40 row-span-2 w-full h-full border-gray-100 rounded-lg skew-x-1"
        >
          <div className="p-3 bg-white h-full rounded-lg">
            <Image
              src={'/infinite.jpeg'}
              className="rounded-lg h-full"
              alt="do you see how infinite you are"
              width={200}
              height={200}
            />
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}
