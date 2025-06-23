"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Answer from "./Answer"

export interface Item {
    id: string
    content: string
}

export default function Container({
    id,
    items,
}: {
    id: string
    items: Item[]
}) {
    const { setNodeRef } = useDroppable({ id })

    return (
        <div
            ref={setNodeRef}
            className="flex h-full flex-col rounded-md border w-full">
            <div className="flex-1 w-full">
                <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <ul className="flex flex-col gap-2 w-full">
                        {items.map((item) => (
                            <Answer
                                key={item.id}
                                id={item.id}
                                content={item.content}
                            />
                        ))}
                    </ul>
                </SortableContext>

                {items.length === 0 && (
                    <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rilascia qua!</p>
                    </div>
                )}
            </div>
        </div>
    )
}