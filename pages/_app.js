import { useState, useEffect } from 'react'
import App from "../src/app"
import Layout from '../components/layout'
import '../styles/globals.css'
import Head from 'next/head'
import Loading from "../public/assets/loading.gif"
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
	const [app] = useState(new App())
	return (
		<>	
			<Head>
				<title>NY Times</title>
			</Head>
			<div className='wrapper loading-wrapper d-none' align="center">
				<div className='loading'><Image src={Loading} width={200} height={200}/></div>
			</div>
			<Layout app={app}>
				<Component {...pageProps} app={app} />
			</Layout>
		</>
  	)
}


export default MyApp
