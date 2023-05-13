"use client";

import { Champion, championIcon } from "@/lib/data-dragon";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface ChampionIconProps {
    champion: Champion;
    selected?: boolean;
    enabled?: boolean;
}

export function ChampionIcon({ champion, selected, enabled }: ChampionIconProps) {
    const [iconUrl, setIconUrl] = useState<string | null>(null);

    useEffect(() => {
        (async function () {
            setIconUrl(await championIcon(champion.id));
        })();
    }, [champion.id]);

    return (
        <div className={clsx("border border-[#2c2c40] overflow-hidden w-16 h-16", !enabled && "grayscale opacity-20")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {iconUrl && <img src={iconUrl} draggable={false} alt={champion.name} />}
        </div>
    );
}
