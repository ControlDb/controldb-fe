import React from 'react';
import { useRouter, withRouter } from 'next/router'
import { useState, useContext, useEffect } from 'react'

export default function ViewDocument() {
  const router = useRouter()
  const [userRead, setUserRead] = useState<string>('')
  const [userWrite, setUserWrite] = useState<string>('')
  
  const user = localStorage.getItem('user')

  // 
  // useEffect(() => {
}