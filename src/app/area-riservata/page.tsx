import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUsers } from '@/helper/gh'
// import { formatDate } from '@/helper/formatDate' // You may need to create this utility
import { User } from '@/types' // Adjust the import path as necessary

export default async function AreaRiservata() {
    const cookieStore = await cookies()
    const isAuthed = cookieStore.get('prof_auth')?.value === 'ok'

    if (!isAuthed) {
        redirect('/accesso')  // Reindirizza se non autenticato
    }

    // Fetch users from GitHub
    let users: User[] = [];
    try {
        users = await fetchUsers();
        // Sort users by date (most recent first)
        users.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }
    return (
        <main className='flex flex-col items-center h-full w-full mt-10'>
            <h1 className='text-3xl font-bold m-4'>Benvenuto nell&apos;area riservata</h1>
            {/* <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <div className='flex items-center gap-4'>
                                <span>{index + 1 + ")"}</span>
                                <h2 className='text-xl font-semibold'>{user.username}</h2>
                                <p className=''>frequenta la scuola: {user.school}</p>
                                <p className='text-gray-400'>in data: da sistemare</p>
                            </div>
                        </li>
                    ))}
                </ul> */}
            <div className=' grid h-[50%]  grid-template-col-3 gap-4 flex-1 overflow-y-auto'>
                {users.map((user, index) => (
                    <div key={index} className='flex items-center gap-4 mb-4'>
                        <span>{index + 1 + ")"}</span>
                        <h2 className='text-xl font-semibold'>{user.username}</h2>
                        <p className=''>frequenta la scuola: {user.school}</p>
                        <p className='text-gray-400'>in data: </p>
                    </div>
                ))}
            </div>
        </main >
    )
}
