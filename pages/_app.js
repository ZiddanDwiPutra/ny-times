import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	const app = new App()

  	return (
		<Layout>
			<Component {...pageProps} app={app} />
		</Layout>
  	)
}

class App{
	constructor(){
		this.appName = "NYTimes"
	}

	encodeAsParamUri(value){
		return encodeURIComponent(JSON.stringify(value))
	}
	
	decodeFromParamUri(value){
		const decodeResult = decodeURIComponent(value)
		return JSON.parse(decodeResult);
	}

}

export default MyApp
