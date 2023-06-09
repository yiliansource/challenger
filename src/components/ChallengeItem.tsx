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
                "select-none cursor-pointer bg-[#17172e] hover:bg-[#202043] border border-[#2c2c40] py-4 px-6 rounded-lg flex flex-col justify-center",
                selected && "!bg-[#1154df] border-transparent"
            )}
            onClick={onClick}
        >
            <p className="mb-2 font-bold text-sm text-center">{challenge.name}</p>
            <p className="text-center text-xs">{challenge.description}</p>
        </div>
    );
}
