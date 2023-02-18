import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Header from '../components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState<String>('')
  const router = useRouter()

  const handleChange = (e: any) => {
    setUser(e.target.value)
  }

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (user === '') {
      alert('Please enter a username')
      return
    }
    router.push('/documents')
  }
    
  return (
    <>
    <Header />
      <div className='h-screen justify-center flex items-center'>
        <div className='content-center'>
          <h1 className='text-6xl font-bold my-6'>Login</h1>
          <form className='flex flex-col my-2'>
            <input type='text' name='email' id='email' placeholder='Username' onChange={handleChange}/>
            <button onClick={handleLogin} type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
