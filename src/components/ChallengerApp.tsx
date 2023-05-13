"use client";

import { Challenge } from "@/lib/challenges";
import { Champion } from "@/lib/data-dragon";
import { useEffect, useState } from "react";
import { ChallengeItem } from "./ChallengeItem";
import { ChampionIcon } from "./ChampionIcon";

export interface ChallengerAppProps {
    challenges: Challenge[];
    champions: Record<string, Champion>;
    attributes: Record<string, Record<string, boolean>>;
}

export function ChallengerApp({ challenges, champions, attributes }: ChallengerAppProps) {
    const [filteredChampionIds, setFilteredChampionIds] = useState<string[]>([]);
    const [selectedChampionIds, setSelectedChampionIds] = useState<string[]>([]);
    const [selectedChallengeIndices, setSelectedChallengeIndices] = useState<number[]>([]);

    useEffect(() => {
        function satisfies(champion: Champion, challenge: Challenge): boolean {
            return attributes[champion.name]?.[challenge.attribute] || false;
        }

        const challengeFilter = selectedChallengeIndices.map((i) => challenges[i]);

        setFilteredChampionIds(
            Object.values(champions)
                .filter((c) => challengeFilter.every((f) => satisfies(c, f)))
                .map((c) => c.id)
        );
    }, [champions, challenges, attributes, selectedChallengeIndices]);

    return (
        <div>
            <div className="mb-6 flex flex-row flex-wrap gap-2">
                {challenges.map((c, i) => (
                    <ChallengeItem
                        key={i}
                        challenge={c}
                        selected={selectedChallengeIndices.includes(i)}
                        onClick={() => {
                            if (selectedChallengeIndices.includes(i)) {
                                setSelectedChallengeIndices(selectedChallengeIndices.filter((s) => s !== i));
                            } else {
                                setSelectedChallengeIndices(selectedChallengeIndices.concat(i));
                            }
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-row flex-wrap gap-2">
                {Object.values(champions).map((c) => (
                    <ChampionIcon
                        key={c.id}
                        champion={c}
                        enabled={filteredChampionIds.includes(c.id)}
                        selected={selectedChampionIds.includes(c.id)}
                    />
                ))}
            </div>
        </div>
    );
}
