import React from 'react';
import { useRouter, withRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

import { getDocumentInfo } from './api/middleware'

export default function ViewDocument() {
  const router = useRouter()
  const [userRead, setUserRead] = useState<string>('')
  const [userWrite, setUserWrite] = useState<string>('')
  
  const user = localStorage.getItem('user') || ''

  useEffect(() => {
    const getDocument = async () => {
      const res = await getDocumentInfo(user)
      console.log(res)
    }
    getDocument()
  }
}