import { useDnD } from "@/helper/useDnd"
import { KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DndContext } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import DroppableContainer from "@/app/lab/components/DroppableContainer"
import { useEffect, useState } from "react"

const initialContainers = [
    { id: "prima", items: [] },
    { id: "seconda", items: [] },
    {
        id: "risposte",
        items: [
            { id: "task-5", content: "Risposta 1" },
            { id: "task-1", content: "Risposta 2" },
        ],
    },
]

export default function StepThree() {
    const [tutorialStep, setTutorialStep] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);

    const {
        containers,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useDnD(initialContainers)

    // Track tutorial progress
    useEffect(() => {
        // If an item has been dragged to the first container, update tutorial state
        if (containers[0].items.length > 0 && !hasDragged) {
            setHasDragged(true);
            setTutorialStep(1);
        }
    }, [containers, hasDragged]);

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

    return (
        <div className="h-full min-h-[calc(100dvh-22rem)]">
            <div className="w-full mb-24">
                <h1 className="text-2xl text-center font-bold m-8">Step 3: Drag and Drop tutorial</h1>
                <p className="text-center text-xl font-semibold mb-4">
                    In questa sezione capirai come utilizzare il drag & drop, per svolgere poi l&apos;ultimo esercizio.
                </p>
                <p className="text-center text-lg mb-4">
                    Trascina le risposte nella colonna a sinistra, per completare l&apos;esercizio.
                </p>

                {tutorialStep === 0 && (
                    <div className="text-center text-blue-600 animate-pulse font-bold">
                        Prendi e trascina una risposta nella colonna a sinistra!
                    </div>
                )}
                {tutorialStep === 1 && (
                    <div className="text-center text-green-600 font-bold">
                        Ottimo! Hai completato il tutorial di drag & drop! 👏
                    </div>
                )}
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div className="flex mx-[2em] justify-between gap-4 items-start">
                    <div className="w-[45%] flex flex-col">
                        <h2 className="text-center font-bold text-xl m-4">Completa qua</h2>
                        <div className={`border-2 ${containers[0].items.length === 0 ? 'border-dashed' : 'border-solid border-green-500'} rounded-lg p-4`}>
                            <DroppableContainer
                                id={containers[0].id}
                                items={containers[0].items}
                            />
                        </div>
                    </div>
                    <div className="w-[45%] flex flex-col">
                        <h2 className="text-center font-bold text-xl m-4">Risposte</h2>
                        <div className={`border-2 border-solid rounded-lg p-4 ${tutorialStep === 0 && !hasDragged ? 'border-pulse' : ''}`}>
                            <DroppableContainer
                                id={containers[2].id}
                                items={containers[2].items}
                            />
                        </div>
                    </div>
                </div>
            </DndContext>
        </div >
    )
}
