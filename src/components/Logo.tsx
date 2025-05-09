import React from 'react'
import Image from 'next/image'

/**
 * Logo component
 *
 * @returns {JSX.Element} Logo component
 */

function Logo() {
    return (
        <Image src="/info.png" width={60} height={60} alt='Università degli Studi di Padova' />
    )
}

export default Logo