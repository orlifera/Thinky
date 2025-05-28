"use client"

import { useSortable } from "@dnd-kit/sortable"
import { UniqueIdentifier } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import MarkDown from "@/components/MarkDown";

export default function Answer({ id, content }: { id: UniqueIdentifier; content: string }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <li
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="rounded border bg-white dark:border-gray-700 dark:bg-gray-700"
        >{/* p-3 can be removed */}
            <div className="flex items-center gap-3">
                <span className="m-2 text-gray-500 dark:text-gray-400">⋮</span>
                <MarkDown content={content} />
            </div>
        </li>
    )
}
