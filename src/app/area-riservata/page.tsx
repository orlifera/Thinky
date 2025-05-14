
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function areaRiservata() {
    const cookieStore = await cookies()
    const isAuthed = cookieStore.get('prof_auth')?.value === 'ok'

    if (!isAuthed) {
        redirect('/accesso')  // Reindirizza se non autenticato
    }

    return (
        <div>
            <h1>Benvenuta prof!</h1>
            <p>Questa è l&apos;area riservata</p>
        </div>
    )
}
