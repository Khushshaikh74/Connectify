import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className='h-screen flex'>
            {showSidebar && <Sidebar />}

            <div className='flex-1 flex flex-col'>
                <Navbar />
                <main className='flex-1 overflow-y-auto p-4' role="main">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout
