import React from 'react';
import { useRouter, withRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

import { getDocumentInfo } from './api/middlewareApi'
import Header from '@/components/header';

export default function ViewDocument() {
  const router = useRouter()
  const [documentInfo, setDocumentInfo] = useState<any>([])
  
  const user = router.query.user
  const document = router.query.document

  useEffect(() => {
    const getDocument = async () => {
      const res = await getDocumentInfo(document)
      setDocumentInfo(res)
    }
    getDocument()
  }
  , [])


  return (
    <>
    <Header user={user} />
      <div className='justify-center flex items-center'>
    <div className='content-center'>
      <h1 className='text-6xl font-bold my-6'>Document Info</h1>
    {documentInfo.map((info: any) => {
       <div className='flex flex-col my-2'>
            <div className='flex flex-row'>
              <div className='w-1/2'>Document Name:</div>
              <div className='w-1/2'>{documentInfo.fieldName}</div>
            </div>
            <div className='flex flex-row'>
              <div className='w-1/2'>Document Type:</div>
              <div className='w-1/2'>{documentInfo.fieldType}</div>
            </div>
            <div className='flex flex-row'>
              <div className='w-1/2'>Document Value:</div>
              <div className='w-1/2'>{documentInfo.fieldValue}</div>
            </div>
          </div>
    }
    )}
    </div>
    </div>
    </>
  )
}
