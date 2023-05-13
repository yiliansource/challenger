import { Challenge } from "@/lib/challenges";
import clsx from "clsx";

export interface ChallengeItemProps {
    challenge: Challenge;
    selected?: boolean;
    enabled?: boolean;

    onClick?(): void;
}

export function ChallengeItem({ challenge, selected, onClick }: ChallengeItemProps) {
    return (
        <div
            className={clsx(
                "select-none cursor-pointer bg-[#17172e] border border-[#2c2c40] w-64 h-48 p-4 rounded-lg shadow-md flex flex-col justify-center",
                selected && "bg-[#1154df] border-transparent"
            )}
            onClick={onClick}
        >
            <p className="mb-2 font-bold text-center">{challenge.name}</p>
            <p className="text-center text-sm">{challenge.description}</p>
        </div>
    );
}
