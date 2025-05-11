'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function NotFound() {
    return (
        <div>
            <div className="relative w-full h-[calc(100vh-4rem)] pb-16">

                {/* Background Image */}
                <div className="m-4 p-4">
                    <Image
                        src="/404.png"
                        alt="404"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Overlay Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
                    <div className="bg-primary/70 p-4">

                        <h1 className="text-4xl font-bold">
                            404 - Pagina non trovata <span role="decoration">😢</span>
                        </h1>
                        <p className="text-lg mt-2 mb-4">La pagina che stai cercando non esiste</p>
                        <Button
                            className="text-black dark:bg-white"
                            variant="outline"
                            onClick={() => (window.location.href = '/')}
                        >
                            Torna alla Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
