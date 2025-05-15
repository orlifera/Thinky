"use client"

import { useState } from "react"
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
    closestCorners,
    DragOverlay
} from "@dnd-kit/core"

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

import DroppableContainer from "@/app/lab/components/DroppableContainer"
import { Item } from "@/app/lab/components/DroppableContainer"

interface Container {
    id: string
    title: string
    items: Item[]
}

// function ItemOverlay({ children }: { children: React.ReactNode }) {
//     return (
//         <div className="cursor-grabbing touch-none rounded border bg-white p3 shadow-md ">
//             <div className="flex items-center gap-3">
//                 <span className="text-gray-500 dark:text-gray-400">⋮</span>
//                 <span className="dark:text-gray-200">{children}</span>
//             </div>
//         </div>
//     )
// }

export default function MultipleContainers() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    void activeId;
    const [containers, setContainers] = useState<Container[]>([
        {
            id: "prima",
            title: "Prima Domanda",
            items: [

            ],
        },
        {
            id: "seconda",
            title: "Seconda Domanda",
            items: [],
        },
        {
            id: "risposte",
            title: "Risposte",
            items: [
                { id: "task-5", content: "Setup project" },
                { id: "task-1", content: "Research @dnd-kit" },
                { id: "task-2", content: "Create basic example" },
                { id: "task-3", content: "Write tutorial" },
                { id: "task-4", content: "Record demo video" }
            ],
        },
    ])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 100,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const findContainerId = (itemId: UniqueIdentifier): UniqueIdentifier | undefined => {
        if (containers.some((c) => c.id === itemId)) return itemId
        return containers.find((c) => c.items.some((item) => item.id === itemId))?.id
    }

    const handleDragStart = (e: DragStartEvent) => {
        setActiveId(e.active.id)
    }

    const handleDragOver = (e: DragOverEvent) => {
        const { active, over } = e
        if (!over) return

        const activeContainerId = findContainerId(active.id)
        const overContainerId = findContainerId(over.id)

        if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) return

        setContainers((prev) => {
            const activeContainer = prev.find((c) => c.id === activeContainerId)!
            const activeItem = activeContainer.items.find((i) => i.id === active.id)!
            return prev.map((container) => {
                if (container.id === activeContainerId) {
                    return { ...container, items: container.items.filter((i) => i.id !== active.id) }
                }
                if (container.id === overContainerId) {
                    const overIndex = container.items.findIndex((i) => i.id === over.id)
                    if (overIndex !== -1) {
                        return {
                            ...container,
                            items: [
                                ...container.items.slice(0, overIndex),
                                activeItem,
                                ...container.items.slice(overIndex),
                            ],
                        }
                    }
                    return { ...container, items: [...container.items, activeItem] }
                }
                return container
            })
        })
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e

        if (!over) {
            setActiveId(null)
            return
        }

        const activeContainerId = findContainerId(active.id)
        const overContainerId = findContainerId(over.id)

        if (!activeContainerId || !overContainerId) {
            setActiveId(null)
            return
        }

        if (activeContainerId === overContainerId && active.id !== over.id) {
            const containerIndex = containers.findIndex((c) => c.id === activeContainerId)

            if (containerIndex === -1) {
                setActiveId(null)
                return
            }

            const container = containers[containerIndex];
            const activeIndex = container.items.findIndex((i) => i.id === active.id)
            const overIndex = container.items.findIndex((i) => i.id === over.id)

            if (activeIndex === -1 || overIndex === -1) {
                const newItems = arrayMove(container.items, activeIndex, overIndex)
                setContainers((containers) => {
                    return containers.map((c, index) => {
                        if (index === containerIndex) {
                            return { ...c, items: newItems }
                        }
                        return c
                    }
                    )
                })
            }
        }
        setActiveId(null)
    }

    // const getActiveItem = () => {
    //     for (const container of containers) {
    //         const item = container.items.find((i) => i.id === activeId)
    //         if (item) {
    //             return item
    //         }
    //     }
    // }


    return (
        <div className="mx-auto w-full h-screen">
            <h2 className="mb-4 text-xl font-bold dark:text-white">Kanban Board</h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex mx-[5em] justify-between gap-4">
                    <div className=" w-[45%] gap-4 md:grid-cols-3 flex flex-col">
                        <p>
                            CODICE ESEMPIO
                        </p>
                        <DroppableContainer
                            id={containers[0].id}
                            title={containers[0].title}
                            items={containers[0].items}
                        />

                        <p>
                            CODICE ESEMPIO
                        </p>

                        <DroppableContainer
                            id={containers[1].id}
                            title={containers[1].title}
                            items={containers[1].items}
                        />
                    </div>
                    <div className="w-[45%]">
                        <DroppableContainer
                            id={containers[2].id}
                            title={containers[2].title}
                            items={containers[2].items}
                        />
                    </div>
                </div>
                {/* <DragOverlay>
                    <ItemOverlay>
                        {getActiveItem()?.content}
                    </ItemOverlay>
                </DragOverlay> */}
            </DndContext>
        </div>
    )
}
