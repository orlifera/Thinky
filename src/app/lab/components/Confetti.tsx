import { Button } from '@/components/ui/button';
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
            <Button
                onClick={handleConfetti}
                variant={"default"}
                className='p-8 text-lg'
            >
                Festeggia!
            </Button>
        </div>
    )
}


export default Confetti