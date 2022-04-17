import { useState, useEffect } from 'react'
import App from "../src/app"
import Layout from '../components/layout'
import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
	const [app] = useState(new App())
	return (
		<>	
			<Head>
				<title>NY Times</title>
			</Head>
			<Layout app={app}>
				<Component {...pageProps} app={app} />
			</Layout>
		</>
  	)
}


export default MyApp
