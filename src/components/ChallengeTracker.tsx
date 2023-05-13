import { AttributeLookup, Challenge, satisfiesChallenge } from "@/lib/challenges";
import { Champion } from "@/lib/data-dragon";
import { ProgressBar } from "./ProgressBar";

export interface ChallengeTrackerProps {
    challenges: Challenge[];
    champions: Champion[];
    attributes: AttributeLookup;
}

export function ChallengeTracker({ challenges, champions, attributes }: ChallengeTrackerProps) {
    return (
        <div>
            {challenges.map((chall, i) => (
                <div key={chall.name} className="flex flex-row items-center">
                    <p className="text-sm font-bold mr-4">{chall.name}</p>
                    <p>
                        <ProgressBar
                            progress={Math.min(
                                champions.filter((c) => satisfiesChallenge(c, chall, attributes)).length /
                                    chall.minimum,
                                1
                            )}
                        />
                    </p>
                </div>
            ))}
        </div>
    );
}
