
import React from 'react'
import MarkDown from '@/components/MarkDown'

const code = ["`console.log('Hello World')`", "`sconsole.log('Hello World')`", "`sconsole.log('Hello World')`"]


function page() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='w-full flex gap-4 m-4 p-4'>
                <div className='w-[80%] min-h-[10em] text-wrap'>
                    <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                    </p>
                </div>
                <div className='min-h-[10em]'>
                    <MarkDown content={code[0]} />
                </div>
            </div>
            <div className='w-full flex gap-4 m-4 p-4'>
                <div className='min-h-[10em]'>
                    <MarkDown content={code[1]} />
                </div>
                <div className='w-[80%] flex justify-end min-h-[10em] text-wrap'>
                    <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                    </p>
                </div>

            </div>
            <div className='w-full flex gap-4 m-4 p-4'>
                <div className='w-[80%] min-h-[10em] text-wrap'>
                    <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                    </p>
                </div>
                <div className='min-h-[10em]'>
                    <MarkDown content={code[2]} />
                </div>
            </div>
        </div>

    )
}

export default page