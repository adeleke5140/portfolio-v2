import Head from 'next/head'
import { motion } from 'framer-motion'
import { PageWrapper } from '@/components/pageWrapper'

const container = {
  hidden: { opacity: 0, scale: 1 },
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
      bounce: 0,
      duration: 1,
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

      <PageWrapper
        heading={
          <div>
            <h1 className="font-hobx text-2xl">Kehinde</h1>
            <p className=" text-gray-700">Design engineer 🦄</p>
          </div>
        }
        path="/"
        showHeading
      >
        <motion.section>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 dark:border-[#282828] dark:bg-[#282828]"
          >
            <motion.div
              variants={item}
              className="rounded-lg dark:text-[#fefefe]"
            >
              <p>
                I obsess over typefaces, padding, highlight color, transitions
                and weird ui jags. I currently work at{' '}
                <a href="https://www.mastra.ai" className="underline">
                  mastra.ai
                </a>{' '}
                where I built the website and cloud dashboard prototype.
              </p>
            </motion.div>

            <motion.div variants={item}>
              <p className="dark:text-[#fefefe] rounded-lg h-full">
                I am drawn to design because of beauty. The beauty of how types
                and animation can be used to tell stories. The infinite is the
                well I draw from.
              </p>
            </motion.div>

            <motion.div variants={item}>
              You can reach me at{' '}
              <a
                className="underline text-gray-700 underline-offset-2 decoration-1 decoration-black "
                href="mailto:k@kehinde.me?subject=Hi Kehinde, how's it going"
              >
                k@kehinde.me
              </a>
            </motion.div>
          </motion.div>
        </motion.section>
      </PageWrapper>
    </>
  )
}
