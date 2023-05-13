"use client";

import { Champion, championIcon } from "@/lib/data-dragon";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ChampionIcon } from "./ChampionIcon";

export interface ChampionItemProps {
    champion: Champion;
    selected?: boolean;
    enabled?: boolean;

    onClick?(): void;
}

export function ChampionItem({ champion, selected, enabled, onClick }: ChampionItemProps) {
    return (
        <div
            className={clsx(
                "border border-[#2c2c40] w-16 h-16",
                !enabled && "grayscale opacity-20",
                enabled && "hover:brightness-200 cursor-pointer",
                selected && "!border-yellow-300"
            )}
            onClick={(enabled && onClick) || undefined}
        >
            <ChampionIcon champion={champion} />
        </div>
    );
}
