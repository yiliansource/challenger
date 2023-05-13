import clsx from "clsx";

export interface ProgressBarProps {
    progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="w-96 h-2 rounded-full overflow-hidden bg-[#11112a]">
            <div
                className={clsx("bg-[#1154df] h-full", progress >= 1 && "!bg-green-500")}
                style={{ width: `${(progress * 100).toFixed(2)}%` }}
            ></div>
        </div>
    );
}
