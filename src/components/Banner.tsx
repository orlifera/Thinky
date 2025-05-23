import React from 'react'
import Image from 'next/image'
import { BannerProps } from '@/types'
const colorMap: Record<string, string> = {
    Blu: 'blue-500',
    Rosso: 'red-500',
    Viola: 'purple-500',
    Verde: 'green-500',
    Arancione: 'orange-500',
    Gialla: 'yellow-500',
    Grigio: 'gray-400',
    Bianco: 'white',
    Marrone: 'amber-950',
    Nero: 'black',
    Celeste: 'sky-500',
    Dorato: 'amber-400',
    Rossa: 'red-500',
    Turchese: 'teal-500',
    Beige: 'stone-500',
    Lilla: 'fuchsia-500',
    Argento: 'zinc-500',
    Indaco: 'indigo-500',
    Lime: 'lime-500',
    Rosa: 'pink-500',
    Fucsia: 'fuchsia-500',
    Sabbia: 'stone-500',
    Bianca: 'white',
};

// Get Tailwind class from full username
function getTailwindColorClass(username?: string): string {
    const parts = username ? username.split(' ') : undefined;
    const rawColor = parts ? parts[1] : undefined;
    const tailwindColor = rawColor ? colorMap[rawColor] : undefined;
    return tailwindColor ? `text-${tailwindColor}` : 'text-red-500'; // fallback
}


export default function Banner({ source, title, text, username }: BannerProps) {
    const textColor = getTailwindColorClass(username);
    console.log(getTailwindColorClass(username)); // Output: text-blue-500
    return (
        <div className="relative mx-2 px-2 w-full h-[25em] md:h-[35em] flex items-center justify-center text-white">
            <div className="absolute mb-8 inset-0 z-0 w-full" >
                <Image
                    src={source}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-30"
                />
            </div >

            {/* Text content */}
            <div className="relative z-20 text-center px-6 max-w-4xl">
                <h1 className="text-4xl font-extrabold mb-4">{title} <span className={textColor}>{username?.toUpperCase()}</span></h1>
                <p className="text-lg w-[70%] m-auto font-light leading-relaxed">
                    {text}
                </p>
            </div>
        </div>



    )
}