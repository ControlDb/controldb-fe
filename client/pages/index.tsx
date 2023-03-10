import { useRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

import Header from '../components/header'
import { baseCall } from './api/middlewareApi'

export default function Home() {
  const [user, setUser] = useState('')
  const router = useRouter()

  useEffect(() => {
    const base = async () => {
      const res = await baseCall()
      console.log(res)
    }
    base()
  }, [])

  const handleChange = (e: any) => {
    setUser(e.target.value)
  }

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (user === '') {
      alert('Please enter a username')
      return
    }
    router.push({
      pathname: `/user/${user}`,
    })
  }
    
  return (
    <>
    <Header user='' />
      <div className='justify-center flex items-center'>
        <div className='content-center'>
          <h1 className='text-6xl font-bold my-6'>Login</h1>
          <form className='flex flex-col my-2 py-6'>
            <input className='py-2 px- my-4' type='text' name='email' id='email' placeholder='Username' onChange={handleChange}/>
            <button onClick={handleLogin} type='submit' className='bg-blue-500 text-white font-bold py-2 px-4 rounded'>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
