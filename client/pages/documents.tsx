import { useRouter, withRouter } from "next/router"

import Header from "@/components/header"
import { useEffect, useState } from "react"

import { getUserDocuments } from './api/middlewareApi'


export default function Documents() {
  const [documents, setDocuments] = useState<string[]>([]);
  const router = useRouter()
  
  const user = localStorage.getItem('user') || ''
  // const user = 'abc'
  if (!user) {
    router.push({
      pathname: '/login',
    })
  }

  // use effect to get user's documents
  useEffect(() => {
    const getDocuments = async () => {
      const res = await getUserDocuments(user)
      setDocuments(res)
      console.log('RESPONSE', res)
    }
    getDocuments()
  }, [])

  const createNewFile = () => {
    router.push({
      pathname: '/create-document',
    })
  }

  
  return (
    <>
    <Header user={user} />
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6">
      <li
          key='1'
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:animate-wiggle"
        >
          <div className="flex flex-1 flex-col p-8 " onClick={createNewFile}>
            <h3 className="mt-6 text-lg font-bold text-gray-900 my-4">Upload new File</h3>
            <div className="flex flex-col justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <dl className="my-6 flex flex-grow flex-col justify-between">
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  IPFS
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
              </div>
              <div className="-ml-px flex w-0 flex-1">
              </div>
            </div>
          </div>
        </li>
        
      {documents.map((document) => (
        <li
          key={document}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow hover:animate-wiggle"
        >
          <div className="flex flex-1 flex-col p-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3 className="mt-6 text-md font-medium text-gray-900 my-8">UUID: {document}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dd className="mt-3">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Document ID
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
              </div>
              <div className="-ml-px flex w-0 flex-1">
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}
