import confetti from 'canvas-confetti'
import React, { useEffect } from 'react'

function Confetti() {
    useEffect(() => {
        confetti(); // fire on mount
    }, []);

    const handleConfetti = () => {
        confetti();
    }

    return (
        <div className="">
            <button
                onClick={handleConfetti}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Celebrate!
            </button>
        </div>
    )
}


export default Confetti