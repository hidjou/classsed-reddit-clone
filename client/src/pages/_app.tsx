import { AppProps } from 'next/app'
import Axios from 'axios'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'

import { AuthProvider } from '../context/auth'

import '../styles/tailwind.css'
import '../styles/icons.css'

import Navbar from '../components/Navbar'

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api'
Axios.defaults.withCredentials = true

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url)
    return res.data
  } catch (err) {
    throw err.response.data
  }
}

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname)

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
      }}
    >
      <AuthProvider>
        {!authRoute && <Navbar />}
        <div className={authRoute ? '' : 'pt-12'}>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </SWRConfig>
  )
}

export default App
