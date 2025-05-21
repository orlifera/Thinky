import React from 'react'
import { User } from '@/types'
import { formatDate } from '@/helper/formatDate'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function UserTable({ users }: { users: User[] }) {


    return (
        <>

            <h2 className='text-xl text-center font-extrabold'>Ecco la lista degli utenti registrati:</h2>
            <Table className='w-[90%] m-auto text-center bg-foreground/2'>
                <TableHeader className='bg-primary text-white dark:text-black'>
                    <TableRow>
                        <TableHead className='w-[10%] text-center'>#</TableHead>
                        <TableHead className='w-[30%] text-center'>Nome Utente</TableHead>
                        <TableHead className='w-[30%] text-center'>Scuola</TableHead>
                        <TableHead className='w-[30%] text-center'>Data di Registrazione</TableHead>
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
        </>
    )
}