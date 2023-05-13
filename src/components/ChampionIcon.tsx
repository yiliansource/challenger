"use client";

import { Champion, championIcon } from "@/lib/data-dragon";
import { useEffect, useState } from "react";

export interface ChampionIconProps {
    champion: Champion;
}

export function ChampionIcon({ champion }: ChampionIconProps) {
    const [iconUrl, setIconUrl] = useState<string | null>(null);

    useEffect(() => {
        (async function () {
            setIconUrl(await championIcon(champion.id));
        })();
    }, [champion.id]);

    // eslint-disable-next-line @next/next/no-img-element
    if (iconUrl) return <img className="" src={iconUrl} draggable={false} alt={champion.name} />;
    else return null;
}
