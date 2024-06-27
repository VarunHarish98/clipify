import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen'>
            {/* Header */}
            {/* <Header /> */}
            <Header />
            {/* Body */}
            <Outlet /> 
        </main>
        <footer className='p-8 text-center bg-gray-900'>
            Made by Varun Harish
        </footer>
    </div>
  )
}

export default AppLayout