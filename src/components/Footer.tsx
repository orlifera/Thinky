import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


function Footer() {
    return (
        <footer aria-label='footer' className='flex justify-between static bottom-0 mb-[4em] md:mb-0 w-full bg-gray-900'>
            <div className='flex flex-col items-center justify-center w-full p-4'>
                <Image src="/unipd.png" alt='Logo università di Padova' width={200} height={200} className=' m-auto' />
            </div>
            <ul className='flex flex-col w-full justify-center items-center gap-4 p-4 text-center text-white'>
                <li>
                    Università degli Studi di Padova
                </li>
                <li>
                    Dipartimento di Matematica
                </li>
                <li>
                    Via trieste 63, Padova, 35129
                </li>
                <li>
                    <Link href="/area-riservata" className='text-blue-600 underline visited:text-purple-600'>Area riservata</Link>
                </li>

            </ul>
            <div className='flex flex-col items-center justify-center w-full p-4'>
                <Image src="/math.png" alt='Dipartimenton di matematica' width={200} height={200} className=' m-auto' />
            </div>
        </footer >
    )
}

export default Footer