/**
 *
 * @description Pagina del problema dei filosofi
 */



import React from 'react'
import MarkDown from '@/components/MarkDown'
import Banner from '@/components/Banner'

const markdown = [`
\`\`\`
import React from 'react';
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from 'react';

const MarkDown = ({ content }: { content: string }) => {
  return <div>{content}</div>;
};
\`\`\`
`,
    `
\`\`\`
import React from 'react';
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from 'react';

const MarkDown = ({ content }: { content: string }) => {
  return <div>{content}</div>;
};
\`\`\`
`,

    `
\`\`\`
import React from 'react';
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from 'react';

const MarkDown = ({ content }: { content: string }) => {
  return <div>{content}</div>;
};
\`\`\`
`,
];



function page() {
    return (
        <>
            <div className='flex md:mx-2 flex-col justify-center items-center'>
                <Banner
                    source='/filosofi.png'
                    title='Filosofi'
                    text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-[calc(100dvh-19em)] h-full'>

                <article className='w-[90%] p-4 m-4'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime error dolore minus nobis reprehenderit numquam provident, id velit iure repellat delectus suscipit quisquam exercitationem tenetur explicabo ipsam nam fuga magnam.
                </article>
                <div className='w-full flex m-4 p-4 '>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                        </p>
                    </div>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[0]} />
                    </div>
                </div>
                <div className='w-full flex gap-4 m-4 p-4'>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[1]} />
                    </div>
                    <div className='flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                        </p>
                    </div>

                </div>
                <div className='w-full flex gap-4 m-4 p-4'>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                        </p>
                    </div>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[2]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page