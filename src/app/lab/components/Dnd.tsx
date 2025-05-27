import MarkDown from "@/components/MarkDown"
import { useEffect, useState } from "react"
import { useDnD } from "@/helper/useDnd"
import { KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners, DndContext } from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import DroppableContainer from "./DroppableContainer"

const initialContainers = [
    { id: "prima", items: [] },
    { id: "seconda", items: [] },
    {
        id: "risposte",
        items: [
            { id: "task-5", content: "`console.log(1)`" },
            { id: "task-1", content: "`console.log(2)`" },
            { id: "task-2", content: "`console.log(3)`" },
            { id: "task-3", content: "`console.log(4)`" },
            { id: "task-4", content: "`console.log(5)`" },
        ],
    },
]

export default function Page() {
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

    const existingCode = ["`const primaPartediCodice: string = 'Ciao'`", "`let secondaParteDiCodice: string = 'Ciao'`", "`let terzaParteDiCodice: string = 'Ciao'`"]


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

                        {width >= 768 ?
                            <>
                                <div className=" w-[45%]  m-auto gap-4 flex flex-col">
                                    <MarkDown content={existingCode[0] ?? ""} />
                                    <DroppableContainer
                                        id={containers[0].id}
                                        items={containers[0].items}
                                    />

                                    <MarkDown content={existingCode[1] ?? ""} />

                                    <DroppableContainer
                                        id={containers[1].id}
                                        items={containers[1].items}
                                    />

                                    <MarkDown content={existingCode[2] ?? ""} />
                                </div>
                                <div className=" w-[45%] sticky right-10 self-start ">
                                    <DroppableContainer
                                        id={containers[2].id}
                                        items={containers[2].items}
                                    />
                                </div>
                            </> :
                            <>
                                <ul className="w-full m-auto gap-4 flex flex-col h-auto">
                                    <li> <MarkDown content={existingCode[0] ?? ""} /></li>
                                    <li> <Select defaultValue="" aria-labelledby="school-label">
                                        <SelectTrigger className="w-full text-black dark:text-white bg-white p-8 rounded" >
                                            <SelectValue placeholder="La tua scelta" />
                                        </SelectTrigger>
                                        <SelectContent id="school">
                                            {containers[2].items.map((item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={item.content}
                                                    className=" bg-accent my-2 rounded"
                                                >
                                                    <MarkDown content={item.content} />
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    </li>
                                    <li> <MarkDown content={existingCode[2] ?? ""} /></li>
                                    <li>
                                        <Select defaultValue="" aria-labelledby="school-label">
                                            <SelectTrigger className="w-full text-black dark:text-white bg-white p-8 rounded" >
                                                <SelectValue placeholder="La tua scelta" />
                                            </SelectTrigger>
                                            <SelectContent id="items">
                                                {containers[2].items.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={item.content}
                                                        className="bg-white text-black hover:text-white p-2 m-2 rounded"
                                                    >

                                                        <MarkDown content={item.content} />
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </li>


                                </ul>
                            </>
                        }
                    </div>
                </DndContext>
            </div >
        </div >

    )
}
