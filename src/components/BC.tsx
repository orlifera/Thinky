import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { BCProps } from "@/types"

export default function BC({ currentPage }: BCProps) {
    return (
        <div className=" md:mx-2 md:rounded-b-lg p-2 flex bg-primary/30 items-baseline gap-2 justify-start">
            <p className="text-sm">Ti trovi in:</p>
            <Breadcrumb>
                <BreadcrumbList>
                    {currentPage == "" &&
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#" className=" text-black dark:text-white">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                    }

                    {currentPage && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="underline text-black dark:text-white">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="#"
                                    className="text-gray-700 dark:text-muted-foreground cursor-default pointer-events-none"
                                >
                                    {currentPage}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
