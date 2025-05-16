"use client"

import { useState, useEffect } from "react"
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
    // DragOverlay
} from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import DroppableContainer from "@/app/lab/components/DroppableContainer"
import { Item } from "@/app/lab/components/DroppableContainer"
import MarkDown from "./components/MarkDown"

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

export default function page() {
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
                { id: "task-5", content: "`Setup project`" },
                { id: "task-1", content: "Research @dnd-kit" },
                { id: "task-2", content: "Create basic example" },
                { id: "task-3", content: "Write tutorial" },
                { id: "task-4", content: "Record demo video" },
            ],
        },
    ])
    const [width, setWidth] = useState<number>(0); // Iniziamo con valore 0 (indefinito)
    useEffect(() => {
        // Funzione che aggiorna la larghezza
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Aggiungiamo un listener per il resize
        window.addEventListener("resize", handleResize);

        // Impostiamo la larghezza iniziale subito dopo il montaggio del componente
        handleResize();

        // Cleanup del listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const existingCode = ["`typescript bruh`", "`typescript bruh`", , `console.log("bruh")`]

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 50,
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

        if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) return //se non sono nello stesso container ritorna lo stato come è

        const isSingleSlot = ["prima", "seconda"].includes(overContainerId.toString()) //se l'id del container è uno di quelli delle domande, limita il numero di items che ci possono essere inseriti a uno

        const overContainer = containers.find((c) => c.id === overContainerId)
        if (isSingleSlot && overContainer && overContainer.items.length >= 1) return //se il container ha già un item ritorna lo stato come è

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
            <h2 className="m-4 text-2xl font-bold dark:text-white text-center">Mettiti alla prova! </h2>
            <p className="text-center m-2">Adesso dovrai leggere bene il codice sulla sinistra, e scegliere quale delle risposte disponibili a destra vanno nei corretti slot.
            </p>

            <p className="text-center">Mi raccomando, leggi bene, Ogni slot accetta al massimo una risposta!</p>
            <div className="mt-8">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex mx-[2em] justify-between gap-4 items-start">

                        <div className=" md:w-[45%] w-[80%] m-auto gap-4 flex flex-col">
                            <DroppableContainer
                                id={containers[0].id}
                                title={containers[0].title}
                                items={containers[0].items}
                            />

                            <MarkDown content={existingCode[1] ?? ""} />


                            <p>
                                CODICE ESEMPIO
                            </p>

                            <DroppableContainer
                                id={containers[1].id}
                                title={containers[1].title}
                                items={containers[1].items}
                            />
                        </div>
                        <div className="md:block hidden md:w-[45%] md:sticky md:right-10 md:self-start ">
                            <DroppableContainer
                                id={containers[2].id}
                                title={containers[2].title}
                                items={containers[2].items}
                            />
                        </div>
                        <div className="md:hidden block">

                        </div>
                    </div>

                    {/* <DragOverlay>
                    <ItemOverlay>
                        {getActiveItem()?.content}
                    </ItemOverlay>
                </DragOverlay> */}
                </DndContext>
            </div>
        </div>

    )
}
