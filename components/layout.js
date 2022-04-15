import Head from 'next/head'

export default function Layout({ children }) {
    return (
      <>
        <Head>
            <title>NYTimes</title>
            <meta name="description" content="Provide services for purchasing articles from NYtimes" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" /> 
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap" rel="stylesheet" />
        </Head>
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </>
    )
  }