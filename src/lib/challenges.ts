import { singlePromiseCache } from "ts-promise-cache";
import { Champion } from "./data-dragon";

export interface Challenge {
    name: string;
    description: string;
    attribute: string;
    minimum: number;
}

export type AttributeLookup = Record<string, Record<string, boolean>>;

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

export const attributeLookup = singlePromiseCache<AttributeLookup>(async () => {
    const csv = (await import("@/data/attributes.csv")).default;
    const matrix: AttributeLookup = {};

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

export function satisfiesChallenge(champion: Champion, challenge: Challenge, attributes: AttributeLookup): boolean {
    return attributes[champion.name]?.[challenge.attribute] || false;
}
