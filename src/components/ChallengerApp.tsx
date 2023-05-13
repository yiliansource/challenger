"use client";

import { AttributeLookup, Challenge, satisfiesChallenge } from "@/lib/challenges";
import { Champion } from "@/lib/data-dragon";
import { useEffect, useState } from "react";
import { ChallengeItem } from "./ChallengeItem";
import { ChallengeTracker } from "./ChallengeTracker";
import { ChampionIcon } from "./ChampionIcon";
import { ChampionItem } from "./ChampionItem";

export interface ChallengerAppProps {
    challenges: Challenge[];
    champions: Record<string, Champion>;
    attributes: AttributeLookup;
}

export function ChallengerApp({ challenges, champions, attributes }: ChallengerAppProps) {
    const [filteredChampionIds, setFilteredChampionIds] = useState<string[]>([]);
    const [selectedChampionIds, setSelectedChampionIds] = useState<string[]>([]);
    const [selectedChallengeIndices, setSelectedChallengeIndices] = useState<number[]>([]);

    useEffect(() => {
        const challengeFilter = selectedChallengeIndices.map((i) => challenges[i]);
        const newFilteredChampionIds = Object.values(champions)
            .filter((c) => challengeFilter.some((f) => satisfiesChallenge(c, f, attributes)))
            .map((c) => c.id);
        const newSelectedChampionIds = selectedChampionIds.filter((i) => newFilteredChampionIds.includes(i));

        setFilteredChampionIds(newFilteredChampionIds);
        setSelectedChampionIds(newSelectedChampionIds);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

            <div className="mb-6 flex flex-row flex-wrap gap-2">
                {Object.values(champions).map((c) => (
                    <ChampionItem
                        key={c.id}
                        champion={c}
                        enabled={filteredChampionIds.includes(c.id)}
                        selected={selectedChampionIds.includes(c.id)}
                        onClick={() => {
                            if (selectedChampionIds.includes(c.id)) {
                                setSelectedChampionIds(selectedChampionIds.filter((s) => s !== c.id));
                            } else {
                                if (selectedChampionIds.length < 5) {
                                    setSelectedChampionIds(selectedChampionIds.concat(c.id));
                                }
                            }
                        }}
                    />
                ))}
            </div>

            <div className="bg-[#17172e] border border-[#2c2c40] p-4 rounded-lg">
                <div className="mb-4 flex flex-row gap-2">
                    {selectedChampionIds
                        .concat(Array(5 - selectedChampionIds.length).fill(null))
                        .map((id) => champions[id])
                        .map((c, i) => (
                            <div key={i} className="bg-[#11112a] border border-[#2c2c40] w-16 h-16 ">
                                {c && <ChampionIcon champion={c} />}
                            </div>
                        ))}
                </div>
                <ChallengeTracker
                    champions={selectedChampionIds.map((i) => champions[i])}
                    challenges={selectedChallengeIndices.map((i) => challenges[i])}
                    attributes={attributes}
                />
            </div>
        </div>
    );
}
