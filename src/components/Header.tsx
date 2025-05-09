"use client"

import React from 'react'
import Logo from '@/components/Logo'
import { usePathname } from 'next/navigation'
import BC from '@/components/BC';

/**
 * Header component
 *
 * @returns {JSX.Element} Header component
 */

function Header() {

    const pathname = usePathname();
    const currentPage = pathname.split("/")[1];



    return (
        <>
            <header aria-roledescription='header' aria-label='header' className='flex items-center justify-center w-full h-24 bg-primary shadow-md p-8'>
                <h1> <Logo /></h1>
            </header>
            <BC currentPage={currentPage} />
        </>
    )
}

export default Header