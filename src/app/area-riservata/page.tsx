import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUsers } from '@/helper/gh'
// import { formatDate } from '@/helper/formatDate' // You may need to create this utility
import { User } from '@/types' // Adjust the import path as necessary
import { formatDate } from '@/helper/formatDate'

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
        users.sort((a, b) => new Date(b.date).getTime() + new Date(a.date).getTime());
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }

    if (users.length === 0) {
        return (
            <main className='flex flex-col items-center justify-center h-[calc(100dvh-22rem)] w-full mt-10'>
                <h1 className='text-3xl font-bold m-4'>Benvenuto nell&apos;area riservata</h1>
                <p className='text-lg'>Nessun utente registrato al momento.😢</p>
                <p className='text-lg'>Controlla più tardi.</p>
            </main>
        )
    }

    return (
        <main className='flex flex-col items-center min-h-[calc(100svh-22em)] h-full w-full mt-10'>
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
            {/* <div className=' grid h-[50%]  grid-template-col-3 gap-4 flex-1 overflow-y-auto'>
                {users.map((user, index) => (
                    <div key={index} className='flex items-center gap-4 mb-4'>
                        <span>{index + 1 + ")"}</span>
                        <h2 className='text-xl font-semibold'>{user.username}</h2>
                        <p className=''>frequenta la scuola: {user.school}</p>
                        <p className='text-gray-400'>in data: </p>
                    </div>
                ))}
            </div> */}
            <table className='w-[90%] m-2 text-center h-[10em] border border-gray-300'>
                <thead className='bg-muted-foreground text-white dark:text-black'>
                    <tr className='border-b border-gray-300 '>
                        <th className='border-r  p-2 border-r-gray-300 w-[10%]'>#</th>
                        <th className='border-r  p-2 border-r-gray-300 w-[30%]'>Nome Utente</th>
                        <th className='border-r  p-2 border-r-gray-300 w-[30%]'>Scuola</th>
                        <th className='border-r  p-2 border-r-gray-300 w-[30%]'>Data di Registrazione</th>
                    </tr>
                </thead>
                <tbody className='max-h-[50%] overflow-y-auto'>
                    {users.map((user, index) => (
                        <tr key={index} className='border-b border-gray-300 p-2'>
                            <td className='border-r p-2 border-gray-300'>{index + 1}</td>
                            <td className='border-r p-2 border-gray-300'>{user.username}</td>
                            <td className='border-r p-2 border-gray-300'>{user.school}</td>
                            <td className='border-r p-2 border-gray-300'>{formatDate(user.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main >
    )
}

//html to makle it scrollable, but two <table></table> ??? ask prof. 

// <div className="w-[90%] m-2 border border-gray-300">
//     <table className="w-full text-center">
//         <thead className="bg-muted-foreground text-white dark:text-black">
//             <tr className="border-b border-gray-300">
//                 <th className="border-r p-2 border-gray-300 w-[10%]">#</th>
//                 <th className="border-r p-2 border-gray-300 w-[30%]">Nome Utente</th>
//                 <th className="border-r p-2 border-gray-300 w-[30%]">Scuola</th>
//                 <th className="border-r p-2 border-gray-300 w-[30%]">Data di Registrazione</th>
//             </tr>
//         </thead>
//     </table>

//     {/* Scrollable tbody wrapper */}
//     <div className="max-h-[10em] overflow-y-auto">
//         <table className="w-full text-center">
//             <tbody>
//                 {users.map((user, index) => (
//                     <tr key={index} className="border-b border-gray-300">
//                         <td className="border-r p-2 border-gray-300">{index + 1}</td>
//                         <td className="border-r p-2 border-gray-300">{user.username}</td>
//                         <td className="border-r p-2 border-gray-300">{user.school}</td>
//                         <td className="border-r p-2 border-gray-300">{formatDate(user.date)}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     </div>
// </div>

