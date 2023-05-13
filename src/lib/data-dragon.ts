import urlcat from "urlcat";
import { singlePromiseCache } from "ts-promise-cache";

export interface Champion {
    id: string;
    key: number;
    name: string;
    title: string;
    blurb: string;
    tags: string[];
}

const DRAGON_BASE_URL = "https://ddragon.leagueoflegends.com/";

export const version = singlePromiseCache<string>(
    async () => (await fetchJson<string[]>(urlcat(DRAGON_BASE_URL, "api/versions.json")))[0]
);

export const champions = singlePromiseCache<Record<string, Champion>>(
    async () =>
        (
            await fetchJson(
                urlcat(DRAGON_BASE_URL, "/cdn/:ver/data/en_US/champion.json", {
                    ver: await version(),
                })
            )
        ).data
);

export async function championIcon(name: string): Promise<string> {
    return urlcat(DRAGON_BASE_URL, "/cdn/:ver/img/champion/:name.png", {
        ver: await version(),
        name,
    });
}

async function fetchJson<T = any>(url: string): Promise<T> {
    return (await fetch(url).then((res) => res.json())) as T;
}
