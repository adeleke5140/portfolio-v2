import Head from 'next/head'
import { motion } from 'motion/react'
import { PageWrapper } from '@/components/pageWrapper'
import { ProfileShine } from '@/components/profile-shine/profile-shine'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

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
        showHeading
        heading={<h1 className="text-xl">Design Engineer</h1>}
      >
        <motion.section>
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col text-ken-grey text-[15px] gap-2 dark:border-[#282828] dark:bg-[#282828]"
          >
            <motion.div className="rounded-lg text-[15px] dark:text-[#fefefe]">
              <p>
                Hi, I&apos;m Kenny. I obsess over typefaces, css transitions,
                animation and weird ui jags. I currently work at{' '}
                <a href="https://www.mastra.ai" className="underline">
                  mastra.ai
                </a>
              </p>
            </motion.div>

            <motion.div>
              <p className="dark:text-[#fefefe] text-[15px] rounded-lg h-full">
                I am drawn to design because of beauty. The beauty of how
                typefaces and animation can be used to tell stories. The
                infinite is the well I draw from.
              </p>
            </motion.div>

            <div>
              Check out my{' '}
              <Link className="underline" href="/craft">
                Craft
              </Link>{' '}
              and{' '}
              <Link className="underline" href={'/blog'}>
                Blog
              </Link>
            </div>
            <div className="w-full bg-ken-tertiary h-[0.8px]"></div>

            <A11ySection />
          </motion.div>
        </motion.section>
      </PageWrapper>
    </>
  )
}

const A11ySection = () => {
  return (
    <div>
      <nav className="flex flex-col gap-2" aria-labelledby="a11y-webring-club">
        <p>
          This site is a member of the{' '}
          <a
            className=" underline underline-offset-2"
            rel="external"
            href="https://a11y-webring.club/"
          >
            a11y-webring.club
          </a>
          .
        </p>
        <ul className="flex gap-2">
          <li>
            <a
              className=" bg-gray-100 flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous website <ArrowUpRight size={12} aria-hidden />
            </a>
          </li>
          <li>
            <a
              className=" bg-gray-100 px-3 flex gap-1.5 items-center text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random website <ArrowUpRight size={12} aria-hidden />
            </a>
          </li>
          <li>
            <a
              className=" bg-gray-100 flex gap-1.5 items-center px-3 text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next website <ArrowUpRight size={12} aria-hidden />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export { A11ySection }
