import { singlePromiseCache } from "ts-promise-cache";

export interface Challenge {
    name: string;
    description: string;
    attribute: string;
    minimum: number;
}

export const challenges = singlePromiseCache<Challenge[]>(async () => {
    const csv = (await import("@/data/challenges.csv")).default;
    const challenges: Challenge[] = [];

    for (const row of csv) {
        challenges.push({
            name: row["Name"],
            description: row["Description"],
            attribute: row["Attribute"],
            minimum: parseInt(row["Minimum Champions"]),
        });
    }

    return challenges;
});

export const attributeLookup = singlePromiseCache<Record<string, Record<string, boolean>>>(async () => {
    const csv = (await import("@/data/attributes.csv")).default;
    const matrix: Record<string, Record<string, boolean>> = {};

    for (const row of csv) {
        const obj: Record<string, boolean> = {};
        // console.log(Object.keys(row));
        for (const chall of Object.keys(row).filter((k) => k !== "Name")) {
            obj[chall] = row[chall] == "1";
        }
        matrix[row["Name"]] = obj;
    }

    // console.log(matrix);

    return matrix;
});
