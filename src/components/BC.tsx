import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { BCProps } from "@/types"

export default function BC({ currentPage }: BCProps) {
    return (
        <div className=" sm:mx-2 sm:rounded-b-lg p-2 flex bg-primary/30 items-baseline gap-2 justify-start"
            aria-label='Breadcrumb'
        >
            <p className="text-sm">Ti trovi in:</p>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/" className="text-destructive">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {currentPage && (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="#"
                                    className="text-muted-foreground cursor-default pointer-events-none"
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
