"use client"

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function Toggle() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-background hover:bg-amber-100 dark:bg-blue-950 dark:hover:bg-blue-600"
            aria-hidden="true"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Sun className="stroke-amber-600"
                />
            ) : (
                <Moon
                    className="stroke-slate-200 "
                />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}