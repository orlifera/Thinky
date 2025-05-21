import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUsers } from '@/helper/gh'
import { User } from '@/types' // Adjust the import path as necessary
import UserTable from './components/UserTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Test from './components/Test'


export default async function AreaRiservata() {
    const cookieStore = await cookies()
    const isAuthed = cookieStore.get('prof_auth')?.value === 'ok'
    // const table = false;

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

    return (
        <div id='main-s' className='flex flex-col items-center min-h-[calc(100svh-22em)] h-full w-full mt-10'>
            <h1 className='text-3xl font-bold m-4'>Benvenuto nell&apos;area riservata</h1>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className='w-[80%] bg-primary flex m-auto'>
                    <TabsTrigger value="table">Tabella Utenti</TabsTrigger>
                    <TabsTrigger value="test">Laboratorio</TabsTrigger>
                </TabsList>
                <TabsContent value="table">
                    {
                        users.length > 0
                            ?
                            <UserTable users={users} />
                            :
                            <div className='flex flex-col items-center justify-center h-[calc(100dvh-22rem)] w-full mt-10'>
                                <p className='text-lg'>Nessun utente registrato al momento.😢</p>
                                <p className='text-lg'>Controlla più tardi.</p>
                            </div>
                    }
                </TabsContent>
                <TabsContent value='test'>
                    <Test />
                </TabsContent>
            </Tabs>




        </div>
    )
}

//html to makle it scrollable, but two <table></table> ??? ask prof. 

{/* <div className="w-[90%] m-2 border border-gray-300">
    <table className="w-full text-center">
        <thead className="bg-muted-foreground text-white dark:text-black">
            <tr className="border-b border-gray-300">
                <th className="border-r p-2 border-gray-300 w-[10%]">#</th>
                <th className="border-r p-2 border-gray-300 w-[30%]">Nome Utente</th>
                <th className="border-r p-2 border-gray-300 w-[30%]">Scuola</th>
                <th className="border-r p-2 border-gray-300 w-[30%]">Data di Registrazione</th>
            </tr>
        </thead>
    </table>

    {/* Scrollable tbody wrapper */}
{/* <div className="max-h-[10em] overflow-y-auto">
    <table className="w-full text-center">
        <tbody>
            {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-300">
                    <td className="border-r p-2 border-gray-300">{index + 1}</td>
                    <td className="border-r p-2 border-gray-300">{user.username}</td>
                    <td className="border-r p-2 border-gray-300">{user.school}</td>
                    <td className="border-r p-2 border-gray-300">{formatDate(user.date)}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
</div > */}

