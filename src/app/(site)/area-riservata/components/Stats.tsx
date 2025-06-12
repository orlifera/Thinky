"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
    question: string
    data: Record<string, number>
    optionsLabels?: Record<string, string>
}

const chartConfig = {
    count: {
        label: "Risposte",
        color: "var(--primary)",
    },
} satisfies ChartConfig

export default function StatsBarChart({ data, optionsLabels }: Props) {
    // Trasforma dati per recharts
    const chartData = Object.entries(data).map(([option, count]) => ({
        option: optionsLabels?.[option] || option,
        count,
    }))

    // Trova il massimo per i tick
    const maxValue = Math.max(10, ...chartData.map(d => d.count))
    // Arrotonda il massimo al decino superiore (es: max 43 -> 50)
    const roundedMax = Math.ceil(maxValue / 10) * 10
    // Costruisce i tick
    const yTicks = Array.from({ length: (roundedMax / 10) + 1 }, (_, i) => i * 10)

    return (
        <div className="flex w-full max-w-lg h-[340px] flex-col my-8">
            <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 40,
                            right: 20,
                            bottom: 0, // spazio extra per label lunghe
                            left: 20
                        }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="8" />
                        <XAxis
                            dataKey="option"
                            tickLine={false}
                            tickMargin={12}
                            axisLine={true}
                            height={60}
                            angle={-22}
                            textAnchor="end"
                            style={{ fontSize: 16, fontFamily: "inherit" }}
                        />
                        <YAxis
                            dataKey="count"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            ticks={yTicks}
                            domain={[0, roundedMax]}
                            style={{ fontSize: 16, fontFamily: "inherit" }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" fill="var(--primary)" radius={8}>
                            <LabelList
                                dataKey="count"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}