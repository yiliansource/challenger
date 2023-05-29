"use client";

import { AttributeLookup, Challenge, satisfiesChallenge } from "@/lib/challenges";
import { Champion } from "@/lib/data-dragon";
import clsx from "clsx";
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
    const [championCountLookup, setChampionCountLookup] = useState<Record<string, number>>({});

    const [selectedChampionIds, setSelectedChampionIds] = useState<string[]>([]);
    const [selectedChallengeIndices, setSelectedChallengeIndices] = useState<number[]>([]);

    useEffect(() => {
        const challengeFilter = selectedChallengeIndices.map((i) => challenges[i]);
        const newChampionCountLookup = Object.fromEntries(
            Object.values(champions).map((c) => [
                c.id,
                challengeFilter.filter((f) => satisfiesChallenge(c, f, attributes)).length,
            ])
        );
        setChampionCountLookup(newChampionCountLookup);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [champions, challenges, attributes, selectedChallengeIndices]);

    return (
        <div>
            <div className="mb-4 col-span-3 bg-[#17172e] border border-[#2c2c40] p-4 rounded-lg">
                <div className="mb-4 flex flex-row gap-2">
                    {selectedChampionIds
                        .concat(Array(5 - selectedChampionIds.length).fill(null))
                        .map((id) => champions[id])
                        .map((c, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    "bg-[#11112a] border border-[#2c2c40] w-16 h-16",
                                    c && "cursor-pointer"
                                )}
                                onClick={() => {
                                    setSelectedChampionIds(selectedChampionIds.filter((i) => i !== c.id));
                                }}
                            >
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

            <div className="flex flex-row gap-4 items-start">
                <div className="mb-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
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

                <div className="mb-6 max-w-sm lg:max-w-md 2xl:max-w-3xl flex flex-row flex-wrap gap-2">
                    {Object.values(champions).map((c) => (
                        <ChampionItem
                            key={c.id}
                            champion={c}
                            enabled={!!championCountLookup[c.id]}
                            selected={selectedChampionIds.includes(c.id)}
                            count={championCountLookup[c.id] || 0}
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
            </div>
        </div>
    );
}
