import React from 'react'
import Image from 'next/image'
import { BannerProps } from '@/types'


export default function Banner({ source, title, text, username }: BannerProps) {
    return (
        <div className="relative mx-2 px-2 w-full h-[25em] md:h-[35em] flex items-center justify-center text-white">
            <div className="absolute mb-8 inset-0 z-0 w-full" >
                <Image
                    src={source} // use your Thinky-style banner
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-30"
                />
            </div >

            {/* Text content */}
            <div className="relative z-20 text-center px-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">{title} {username?.toUpperCase()}</h1>
                <p className="text-lg w-[70%] m-auto font-light leading-relaxed">
                    {text}
                </p>
            </div>
        </div>



    )
}