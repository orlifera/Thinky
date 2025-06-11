import { useDnD } from "@/helper/useDnd"
import { KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DndContext } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import DroppableContainer from "@/app/lab/components/DroppableContainer"
import MarkDown from "@/components/MarkDown"


const scrittoriCode = [
    `\`\`\`txt
    ripeti {
        . . .

        produce un elemento in appena_Prodotto;

        . . .
    \`\`\``,
    `\`\`\`txt
        . . .

        inserisce nel Buffer l'elemento;

        . . .
    \`\`\``,


    `\`\`\`txt
} finché(condizioneVerificata);
    \`\`\``,
]

const initialContainers = [
    { id: "prima", items: [] },
    { id: "seconda", items: [] },
    { id: "terza", items: [] },
    { id: "quarta", items: [] },
    {
        id: "risposte",
        items: [
            { id: "wait-empty", content: "`SemaforoRosso(vuoto)`" },
            { id: "wait-scaffale", content: "`SemaforoRosso(Scaffale)`" },
            { id: "signal-vuoto", content: "`SemaforoVerde(Vuoto)`" },
            { id: "signal-scaffale", content: "`SemaforoVerde(Scaffale)`" },
        ],
    },
]

export default function StepFour() {
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
                <h1 className="text-2xl text-center font-bold m-8">Step 3: Completa il comportamento del Produttore</h1>
                <p className="text-center text-xl font-semibold mb-4">
                    Completa l&apos;esercizio trascinando le risposte nella colonna a sinistra.
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
                    <div className="w-[45%] flex flex-col mb-8">
                        <h2 className="text-center font-bold text-xl m-4">Completa qua</h2>

                        <MarkDown content={scrittoriCode[0]} />
                        <DroppableContainer
                            id={containers[0].id}
                            items={containers[0].items}
                        />
                        <DroppableContainer
                            id={containers[1].id}
                            items={containers[1].items}
                        />
                        <MarkDown content={scrittoriCode[1]} />
                        <DroppableContainer
                            id={containers[2].id}
                            items={containers[2].items}
                        />
                        <DroppableContainer
                            id={containers[3].id}
                            items={containers[3].items}
                        />
                        <MarkDown content={scrittoriCode[2]} />

                    </div>
                    <div className="w-[45%] flex flex-col">
                        <h2 className="text-center font-bold text-xl m-4">Risposte</h2>
                        <DroppableContainer
                            id={containers.find(container => container.id === "risposte")?.id || ""}
                            items={containers.find(container => container.id === "risposte")?.items || [{ id: "error", content: "No answers found" }]}
                        />

                    </div>
                </div>
            </DndContext >
        </div >
    )
}
