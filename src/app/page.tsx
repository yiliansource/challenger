import { ChallengerApp } from "@/components/ChallengerApp";
import { attributeLookup, challenges as getChallenges } from "@/lib/challenges";
import { champions as getChampions } from "@/lib/data-dragon";

export default async function Home() {
    const champions = await getChampions();
    const challenges = await getChallenges();
    const attributes = await attributeLookup();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ChallengerApp champions={champions} challenges={challenges} attributes={attributes} />
        </main>
    );
}
