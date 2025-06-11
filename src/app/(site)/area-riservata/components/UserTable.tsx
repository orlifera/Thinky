import React from 'react'
import { User } from '@/types'
import { formatDate } from '@/helper/formatDate'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function UserTable({ users }: { users: User[] }) {


    return (
        <div id='main-content'>


            <h2 className='text-xl text-center font-extrabold'>Ecco la lista degli utenti registrati:</h2>
            <Table className='w-[90%] m-auto text-center bg-foreground/2' >
                <TableCaption className='text-center text-muted-foreground'>
                    Questa tabella mostra gli utenti registrati, la loro scuola e la data di registrazione.
                </TableCaption>
                <TableHeader id="table-header" className='bg-primary'>
                    <TableRow className='group'>
                        <TableHead className='w-[10%] text-center text-white group-hover:text-primary dark:group-hover:text-red-400'>#</TableHead>
                        <TableHead className='w-[30%] text-center text-white group-hover:text-primary dark:group-hover:text-red-400'>Nome Utente</TableHead>
                        <TableHead className='w-[30%] text-center text-white group-hover:text-primary dark:group-hover:text-red-400'>Scuola</TableHead>
                        <TableHead className='w-[30%] text-center text-white group-hover:text-primary dark:group-hover:text-red-400'>Data di Registrazione</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className=''>
                    {users.map((user, index) => (
                        <TableRow key={index} className='border-b  p-2'>
                            <TableCell className='border-r p-2 '>{index + 1}</TableCell>
                            <TableCell className='border-r p-2 '>{user.username}</TableCell>
                            <TableCell className='border-r p-2 '>{user.school}</TableCell>
                            <TableCell className='p-2 '>{formatDate(user.date)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}