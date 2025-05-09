"use client"


import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function notFound() {
    return (
        <>

            <div className="flex w-full h-full flex-col items-center justify-center mx-2">
                <div id='main-content' className="flex absolute z-40 bg-primary/80 text-white p-8 flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">404 - Pagina non trovata <span role='decoration'>😢</span></h1>
                    <p className="text-lg">La pagina che stai cercando non esiste </p>
                    <Button
                        className='text-black  dark:bg-white'
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                    >
                        Torna alla Home
                    </Button>
                </div>
                <div className='flex w-full h-screen relative' aria-hidden="true">
                    <Image src="/404.png" alt="404" width={1000} height={1000} className='w-full h-full' />
                    <div className=' absolute w-full h-screen bg-black/50'></div>

                </div>

            </div>
        </>

    )
}

export default notFound