"use client";

import { Champion, championIcon } from "@/lib/data-dragon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChampionIcon } from "./ChampionIcon";

export interface ChampionItemProps {
    champion: Champion;
    selected?: boolean;
    enabled?: boolean;
    count?: number;

    onClick?(): void;
}

export function ChampionItem({ champion, selected, enabled, count, onClick }: ChampionItemProps) {
    return (
        <div
            className={clsx(
                "relative border border-[#2c2c40] w-16 h-16",
                !enabled && "border-opacity-20",
                "cursor-pointer",
                selected && "!border-yellow-300"
            )}
            onClick={onClick}
        >
            <div className={clsx("transition-all", !enabled && "grayscale opacity-20")}>
                <ChampionIcon champion={champion} />
            </div>
            {(count || 0) >= 2 && (
                <div
                    className={clsx(
                        "absolute z-10 top-0 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full text-center box-content border-4 border-[#070720] bg-yellow-300 text-black font-bold"
                    )}
                >
                    {count}
                </div>
            )}
        </div>
    );
}
