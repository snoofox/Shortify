"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Url = {
    _id: string
    url: string
    shortId: string
}

const deleteUrl = async (id: string) => {
    try {
        const res = await fetch(`/api?id=${id}`, {
            method: 'DELETE'
        })
        const response = await res.json()
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export const columns: ColumnDef<Url>[] = [
    {
        accessorKey: "_id",
        header: () => <div className="font-semibold">ID</div>,
    },
    {
        accessorKey: "url",
        header: () => <div className="font-semibold">URL</div>,
        cell: ({ row }) => {
            const value: string = row.getValue("url")
            return <a className="text-blue-700" href={value}>{value}</a>
        },
    },
    {
        accessorKey: "shortId",
        header: () => <div className="font-semibold">SHORT ID</div>
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const data = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(data._id)}
                        >
                            Copy URL ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogTrigger>
                            <DropdownMenuItem>Update</DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem
                            onClick={() => deleteUrl(data._id)}
                        >Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
