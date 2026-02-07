import React from 'react'
import CheckoutWindow from '@/app/components/CheckoutWindow'

const page = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 p-4'>
      <div className='mx-auto bg-gray-100 h-[80vh] p-1 w-2/5 rounded-2xl'>
        <CheckoutWindow/>
      </div>
      
    </div>
  )
}

export default page
