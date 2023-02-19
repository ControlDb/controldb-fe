import Header from '@/components/header'
import { useRouter, withRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

import { createUserDocument } from './api/middlewareApi'

export default function SetPermission() {
  const router = useRouter()
  const [userRead, setUserRead] = useState<string>('')
  const [userWrite, setUserWrite] = useState<string>('')
  const fields = JSON.parse(localStorage.getItem('fields') || '{}')
  const user = router.query.user

  const onReadChange = (e: any) => {
    setUserRead(e.target.value)
  }

  const onWriteChange = (e: any) => {
    setUserWrite(e.target.value)
  }

  const formatStringToArray = (str: string) => {
    return str.split(',')
  }

  const uploadDocument = () => {
    // split userRead and userWrite into array
    const userReadArray = formatStringToArray(userRead)
    const userWriteArray = formatStringToArray(userWrite)

    // add current user to userReadArray and userWriteArray
    userReadArray.push(user)
    userWriteArray.push(user)

    // Make json object with fields and permissions
    const json = [ fields, 
        {
          read: userReadArray,
          write: userWriteArray
        }
    ]

    console.log("json", json)

    // Upload to IPFS
    const uploadToIPFS = async () => {
      const res = await createUserDocument(user, json)
      console.log("Uploading to ipfs", res)
    }
    uploadToIPFS()

    // Redirect to documents page
    router.push({
      pathname: `/user/${user}`,
      query: { user: user },
    })
  }


  return (
    <>
    <Header user={user} />
    <div className='px-24'>
      <div className="flex justify-center my-4 bg:gray">
        <div className="w-full md:w-1/2 p-4 text-2xl font-bold">Read</div>
        <div className="w-full md:w-1/2 p-4 text-2xl font-bold">Write</div>
      </div>
      <div className="flex justify-center my-4 bg:gray ">
        <div className="w-full md:w-1/2 p-4 text-lg font-semibold">
          <input
            type="text"
            className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            placeholder="Enter username for write"
            onChange={(e) => onReadChange(e)}
          />
        </div>

        <div className="w-full md:w-1/2 p-4 text-lg font-semibold">
          <input
            type="text"
            className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
            placeholder="Enter username for read"
            onChange={(e) => onWriteChange(e)}
          />
        </div>
      </div>
      {/* Button to upload files */}
      <div className="flex justify-center my-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => uploadDocument()}
        >
          Upload to IPFS
        </button>
      </div>
  </div>
    </>
  )
}