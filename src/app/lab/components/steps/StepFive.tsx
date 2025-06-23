import { useDnD } from "@/helper/useDnd"
import { KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DndContext } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import DroppableContainer from "@/app/lab/components/DroppableContainer"
import MarkDown from "@/components/MarkDown"



const initialContainers = [
    { id: "prima", items: [] },
    { id: "seconda", items: [] },
    { id: "terza", items: [] },
    {
        id: "risposte",
        items: [
            { id: "wait-scrittura", content: "`SemaforoRosso(scrittura)`", },
            { id: "wait-lettura", content: "`SemaforoRosso(lettura)`" },
            { id: "write", content: "`Leggo()`" },
            { id: "read", content: "`Scrivo()`" },
            { id: "signal-lettura", content: "`SemaforoVerde(lettura)`" },
            { id: "signal-scrittura", content: "`SemaforoVerde(scrittura)`" },


        ],
    },
]

const scrittoriCode = [
    `\`\`\`
    txt
    ripeti {
    \`\`\`
    `,
    `\`\`\`
        txt
} ;
    \`\`\`
    `,
]


export default function StepFive() {

    const {
        containers,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
    } = useDnD(initialContainers)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return (
        <div className="h-full w-full min-h-[calc(100dvh-22rem)] mb-8">
            <div className="w-full mb-24">
                <h1 className="text-2xl text-center font-bold m-8">Step 5: Completa il comportamento dello scrittore</h1>
                <p className="text-center text-lg mb-4">
                    Trascina le risposte nella colonna a sinistra, per completare l&apos;esercizio.
                </p>
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
                        <h2 className="text-center font-bold text-xl m-4 mb-4">Completa qua</h2>
                        <MarkDown content={scrittoriCode[0]} />
                        <DroppableContainer
                            id={containers[0].id}
                            items={containers[0].items}
                        />
                        <DroppableContainer
                            id={containers[1].id}
                            items={containers[1].items}
                        />
                        <DroppableContainer
                            id={containers[2].id}
                            items={containers[2].items}
                        />
                        <MarkDown content={scrittoriCode[1]} />

                    </div>
                    <div className="w-[45%] flex flex-col mb-8">
                        <h2 className="text-center font-bold text-xl m-4">Risposte</h2>

                        <DroppableContainer
                            id={containers.find(container => container.id === "risposte")?.id || ""}
                            items={containers.find(container => container.id === "risposte")?.items || [{ id: "error", content: "No answers found" }]}
                        />
                    </div>
                </div>
            </DndContext>
        </div >
    )
}
