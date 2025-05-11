import React from 'react'


function loader() {
    return (
        <div className="w-full h-screen m-auto flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
            <h3 className="text-2xl text-gray-500 font-bold mb-4">Attendi un secondo</h3>
            <p className='text-gray-500 font-semibold'>Stiamo caricando il contenuto. Porta un po&apos; di pazienza <span role="decoration">☺️</span></p>
        </div>
    )
}

export default loader