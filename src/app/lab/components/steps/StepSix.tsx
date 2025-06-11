import { useDnD } from "@/helper/useDnd"
import { KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DndContext } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import DroppableContainer from "@/app/lab/components/DroppableContainer"
import MarkDown from "@/components/MarkDown"



const initialContainers = [
    { id: "prima", items: [] },
    { id: "seconda", items: [] },
    { id: "terza", items: [] },
    { id: "quarta", items: [] },
    { id: "quinta", items: [] },
    { id: "sesta", items: [] },
    { id: "settima", items: [] },

    {
        id: "risposte",
        items: [
            { id: "semaforoRosso-mutex", content: "`semaforoRosso(mutex)`" },
            { id: "numLett", content: "`numLettori = numLettori + 1`" },
            { id: "semaforoVerde-mutex", content: "`semaforoVerde(mutex)`" },
            { id: "semaforoRosso-s", content: "`semaforoRosso(scrittura)`" },
            { id: "numLett2", content: "`numLettori = numLettori - 1`" },
            { id: "semaforoVerde-mutex2", content: "`semaforoVerde(mutex)`" },
            { id: "semaforoVerde-s", content: "`semaforoVerde(scrittura)`" },
            { id: "read", content: "`read()`" },
        ],
    },
]

const lettoriCode = [
    `\`\`\`
    txt
    do {
    \`\`\`
    `,
    `\`\`\`
    txt
    if (numLettori = 1) {
    \`\`\`
    `,
    `\`\`\`
    txt
        }
        \`\`\`
    `,
    `
    \`\`\`
    txt
        semaforoRosso(mutex);
    \`\`\`
    `,

    `\`\`\`
    txt
        if (numLettori = 0) {
                \`\`\`
    `,
    `\`\`\`
        txt
}

        semaforoVerde(mutex);
} while (true);
    \`\`\`
    `,
]


export default function StepSix() {

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
        <div className="h-full w-full min-h-[calc(100dvh-22rem)] mb-8">
            <div className="w-full mb-24">
                <h1 className="text-2xl text-center font-bold m-8">Step 4: Completa il comportamento del lettore</h1>
                <p className="text-center text-xl font-semibold mb-4">
                    Adesso che sai usare il drag and drop, dovrai compilare il comportamento corretto del processo lettore.
                </p>
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
                        <MarkDown content={lettoriCode[0]} />
                        <DroppableContainer
                            id={containers[0].id}
                            items={containers[0].items}
                        />
                        <DroppableContainer
                            id={containers[1].id}
                            items={containers[1].items}
                        />
                        <MarkDown content="`if (numLettori == 1) {
    `" />
                        <DroppableContainer
                            id={containers[2].id}
                            items={containers[2].items}
                        />
                        <MarkDown content="`} `" />
                        <DroppableContainer
                            id={containers[3].id}
                            items={containers[3].items}
                        />
                        <DroppableContainer
                            id={containers[4].id}
                            items={containers[4].items}
                        />
                        <MarkDown content={lettoriCode[3]} />
                        <DroppableContainer
                            id={containers[5].id}
                            items={containers[5].items}
                        />
                        <MarkDown content={lettoriCode[4]} />
                        <DroppableContainer
                            id={containers[6].id}
                            items={containers[6].items}
                        />
                        <MarkDown content={lettoriCode[5]} />
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
