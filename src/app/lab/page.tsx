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
} from "@dnd-kit/core"

import DroppableContainer from "@/app/lab/components/DroppableContainer"
import { Item } from "@/app/lab/components/DroppableContainer"

interface Container {
    id: string
    title: string
    items: Item[]
}

export default function MultipleContainers() {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const [containers, setContainers] = useState<Container[]>([
        {
            id: "todo",
            title: "To Do",
            items: [
                { id: "task-1", content: "Research @dnd-kit" },
                { id: "task-2", content: "Create basic example" },
                { id: "task-3", content: "Write tutorial" },
            ],
        },
        {
            id: "in-progress",
            title: "In Progress",
            items: [{ id: "task-4", content: "Record demo video" }],
        },
        {
            id: "done",
            title: "Done",
            items: [{ id: "task-5", content: "Setup project" }],
        },
    ])

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
        useSensor(KeyboardSensor)
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
        setActiveId(null)
    }

    return (
        <div className="mx-auto w-full">
            <h2 className="mb-4 text-xl font-bold dark:text-white">Kanban Board</h2>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="grid gap-4 md:grid-cols-3">
                    {containers.map((container) => (
                        <DroppableContainer
                            key={container.id}
                            id={container.id}
                            title={container.title}
                            items={container.items}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    )
}
