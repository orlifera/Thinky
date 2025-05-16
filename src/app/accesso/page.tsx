'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Accesso() {
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try { //richiede la pwd
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            const result = await res.json()

            if (result.success) { //se va bene rimanda ad area riservata
                router.push('/area-riservata')
            } else {
                alert('Password errata')
            }
        } catch (error) {
            console.error('Login error:', error)
            alert('Errore durante il login')
        }
    }

    return (
        <main className='flex flex-col items-center h-[calc(100vh-22rem)] w-full mt-10'>
            <h1 className='text-3xl font-bold'>Accedi all&apos;area riservata</h1>
            <form onSubmit={handleSubmit} className='md:w-[50%] w-[80%] h-[40%] flex flex-col items-center justify-center gap-4 bg-primary/40 rounded-lg shadow-lg'>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    className='w-[50%] bg-white'

                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Inserisci password"
                />
                <Button variant={"default"} type="submit">Entra</Button>
            </form>
        </main>
    )
}