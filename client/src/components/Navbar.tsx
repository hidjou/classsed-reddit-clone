import Axios from 'axios'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'

import { useAuthState, useAuthDispatch } from '../context/auth'

import RedditLogo from '../images/reddit.svg'
import { Sub } from '../types'
import { useRouter } from 'next/router'

const Navbar: React.FC = () => {
  const [name, setName] = useState('')
  const [subs, setSubs] = useState<Sub[]>([])
  const [timer, setTimer] = useState(null)

  const { authenticated, loading } = useAuthState()
  const dispatch = useAuthDispatch()

  const router = useRouter()

  const logout = () => {
    Axios.get('/auth/logout')
      .then(() => {
        dispatch('LOGOUT')
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (name.trim() === '') {
      setSubs([])
      return
    }
    searchSubs()
  }, [name])

  const searchSubs = async () => {
    clearTimeout(timer)
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/subs/search/${name}`)
          setSubs(data)
          console.log(data)
        } catch (err) {
          console.log(err)
        }
      }, 250)
    )
  }

  const goToSub = (subName: string) => {
    router.push(`/r/${subName}`)
    setName('')
  }

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 px-5 bg-white">
      {/* Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="hidden text-2xl font-semibold lg:block">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/* Serach Input */}
      <div className="max-w-full px-4 w-160">
        <div className="relative flex items-center bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
          <i className="pl-4 pr-3 text-gray-500 fas fa-search "></i>
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded focus:outline-none"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="absolute left-0 right-0 bg-white"
            style={{ top: '100%' }}
          >
            {subs?.map((sub) => (
              <div
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => goToSub(sub.name)}
              >
                <Image
                  src={sub.imageUrl}
                  className="rounded-full"
                  alt="Sub"
                  height={(8 * 16) / 4}
                  width={(8 * 16) / 4}
                />
                <div className="ml-4 text-sm">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-gray-600">{sub.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Auth buttons */}
      <div className="flex">
        {!loading &&
          (authenticated ? (
            // Show logout
            <button
              className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <a className="hidden w-20 py-1 mr-4 leading-5 sm:block lg:w-32 hollow blue button">
                  log in
                </a>
              </Link>
              <Link href="/register">
                <a className="hidden w-20 py-1 leading-5 sm:block lg:w-32 blue button">
                  sign up
                </a>
              </Link>
            </Fragment>
          ))}
      </div>
    </div>
  )
}

export default Navbar
