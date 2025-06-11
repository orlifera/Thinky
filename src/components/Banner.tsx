import React from 'react'
import Image from 'next/image'
import { BannerProps } from '@/types'
const colorMap: Record<string, string> = {
    Blu: 'bg-blue-500',
    Rosso: 'bg-red-500',
    Viola: 'bg-purple-500',
    Verde: 'bg-green-500',
    Arancione: 'bg-orange-500',
    Gialla: 'bg-yellow-500',
    Grigio: 'bg-gray-400',
    Bianco: 'bg-stone-500 text-white',
    Marrone: 'bg-amber-950',
    Nero: 'bg-gray-600',
    Celeste: 'bg-sky-500',
    Dorato: 'bg-amber-400',
    Rossa: 'bg-red-500',
    Turchese: 'bg-teal-500',
    Beige: 'bg-stone-500',
    Lilla: 'bg-fuchsia-500',
    Argento: 'bg-zinc-500',
    Indaco: 'bg-indigo-500',
    Lime: 'bg-lime-500',
    Rosa: 'bg-pink-500',
    Fucsia: 'bg-fuchsia-500',
    Sabbia: 'bg-stone-500',
    Bianca: 'bg-stone-500 text-white',
};


// Get Tailwind class from full username
function getTailwindColorClass(username?: string): string {
    const parts = username ? username.split(' ') : undefined;
    const rawColor = parts ? parts[1] : undefined;
    const tailwindColor = rawColor ? colorMap[rawColor] : undefined;
    return tailwindColor ? tailwindColor : 'bg-red-500';

}


export default function Banner({ source, title, text, username }: BannerProps) {
    const textColor = getTailwindColorClass(username);
    console.log(getTailwindColorClass(username)); // Output: text-blue-500
    return (
        <div className="relative mx-2 px-2 w-full h-[25em] md:h-[35em] flex items-center justify-center text-white">
            <div className="absolute mb-8 inset-0 z-0 w-full" >
                <Image
                    src={source}
                    alt="Banner Background"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-30"
                />
            </div >

            {/* Text content */}
            <div className="relative z-20 text-center px-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold">{title} </h1>
                {username ? <h2 className={`${textColor} text-4xl font-bold p-2 min-w-[5em] m-auto max-w-[70%]`}>
                    {username?.toUpperCase()}
                </h2>
                    :
                    null
                }
                <p className="text-lg w-[70%] m-auto font-light leading-relaxed">
                    {text}
                </p>
            </div>
        </div>



    )
}