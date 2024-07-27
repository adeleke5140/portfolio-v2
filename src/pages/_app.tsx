import '@/styles/globals.css';
import '@/styles/themes/laserwave.css';
import type { AppProps } from 'next/app';
import { italiana, comm } from '@/fonts/setup';
import { Layout } from '@/components/layout';
import { PostContextWrapper } from '@/context/postContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${italiana.variable} ${comm.variable} home font-sans bg-ken-white text-ken-black`}
      id="container"
    >
      <PostContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostContextWrapper>
    </div>
  );
}
