import '../styles/globals.css'
import { AppProps } from 'next/app'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:5000/api'
Axios.defaults.withCredentials = true

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
