import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>Kehinde Adeleke</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <section className='grid place-items-center h-[80vh] w-full'>
        <div className="max-w-2xl mx-auto">
          <p className=' text-5xl sm:text-7xl lg:text-8xl'>Kehinde</p>
          <p className=' font-serif text-center'>seeking adventure、玉のむすび</p>
        </div>
      </section>
    </>
  );
}


