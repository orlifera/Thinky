// app/lab/hooks/useDnD.ts
"use client"

import { useState } from "react"
import {
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    UniqueIdentifier,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export interface Item {
    id: string
    content: string
}

interface Container {
    id: string
    items: Item[]
}

export function useDnD(initialContainers: Container[]) {
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
    const [containers, setContainers] = useState<Container[]>(initialContainers)

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

        const isSingleSlot = ["prima", "seconda"].includes(overContainerId.toString())
        const overContainer = containers.find((c) => c.id === overContainerId)
        if (isSingleSlot && overContainer && overContainer.items.length >= 1) return

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

            const container = containers[containerIndex]
            const activeIndex = container.items.findIndex((i) => i.id === active.id)
            const overIndex = container.items.findIndex((i) => i.id === over.id)

            if (activeIndex === -1 || overIndex === -1) return

            const newItems = arrayMove(container.items, activeIndex, overIndex)
            setContainers((containers) =>
                containers.map((c, index) =>
                    index === containerIndex ? { ...c, items: newItems } : c
                )
            )
        }

        setActiveId(null)
    }

    return {
        containers,
        setContainers,
        activeId,
        setActiveId,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    }
}
