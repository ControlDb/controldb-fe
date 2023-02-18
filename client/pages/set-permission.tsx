// Set Permission for Read and Write for the user

import Header from '@/components/header'
import { useRouter, withRouter } from 'next/router'
import { useState, useContext } from 'react'

export default function SetPermission() {
  const router = useRouter()
  const { user } = router.query
  
  // Get fields from localStorage
  const fields = JSON.parse(localStorage.getItem('fields'))


  return (
    <>
      {/* 2 columns to add users for read  */}
    
    </>
  )
}