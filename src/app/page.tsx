"use client";
import React from "react";
import {BackgroundLines} from "@/components/ui/background-lines";
import {Button} from "@/components/ui/stateful-button";
import {useRouter} from "next/navigation"

export default function Home() {
    // dummy API call
    const router = useRouter();

    // dummy API call
    const handleClick = () => {
        console.log("Redirecting to /home");
        router.push("/home");
        return Promise.resolve(); // 直接返回一个 resolved Promise
    };
    return (<div>
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
                    Sanjana Airlines, <br/> Sajana Textiles.
                </h2>
                <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                    Get the best advices from our experts, including expert artists,
                    painters, marathon enthusiasts and RDX, totally free.
                </p>
                <div className="relative z-20 flex h-40 w-full items-center justify-center">
                    <Button onClick={handleClick}> Come on </Button>
                </div>
            </BackgroundLines>

        </div>
    );
}
