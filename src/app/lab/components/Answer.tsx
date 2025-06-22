"use client"

import { useSortable } from "@dnd-kit/sortable"
import { UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import MarkDown from "@/components/MarkDown";

// Map your item ids to the desired Tailwind classes
const styleClass: Record<string, string> = {
    "wait-empty": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "wait-scaffale": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "signal-vuoto": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "signal-scaffale": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "wait-scrittura": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "wait-lettura": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "write": "bg-blue-500 w-full rounded-lg dark:bg-blue-600",
    "read": "bg-blue-500 w-full rounded-lg dark:bg-blue-600",
    "do-while": "bg-yellow-500 w-full rounded-lg dark:bg-yellow-600",
    "signal-lettura": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "signal-scrittura": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "semaforoRosso-contatoreLettori": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "semaforoVerde-contatoreLettori": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "numLett": "bg-blue-500 w-full rounded-lg dark:bg-blue-600",
    "semaforoRosso-s": "bg-red-500 w-full rounded-lg dark:bg-red-600",
    "numLett2": "bg-blue-500 w-full rounded-lg dark:bg-blue-600",
    "semaforoVerde-contatoreLettori2": "bg-green-500 w-full rounded-lg dark:bg-green-500",
    "semaforoVerde-s": "bg-green-500 w-full rounded-lg dark:bg-green-500",
}

export default function Answer({
    id,
    content,
}: {
    id: UniqueIdentifier;
    content: string;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // Use the styleClass map, fallback to a default style if not found
    const markdownClass = styleClass[id as string] || ""

    return (
        <li
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="rounded border w-full bg-white dark:border-gray-700 dark:bg-gray-700 touch-none"
        >
            <div className="flex items-center gap-3 w-full">
                <span className="m-2 text-gray-500 dark:text-gray-400">⋮</span>
                {/* Pass the computed class to MarkDown */}
                <MarkDown content={content} className={markdownClass} />
            </div>
        </li>
    )
}