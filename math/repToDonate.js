//Tracks how long until donations are available
//Current issues: does not take into account passive rep grow and non regular exp gains
export async function main(ns) {
    ns.tail();
    //Help text
    const args = ns.flags([["help", false]]);
    const faction = ns.args[0];
    const favor = ns.args[1];
    if (args.help || !faction) {
        ns.tprint("This script calculates estimated time to reach Donations.");
        ns.tprint(`Usage: run ${ns.getScriptName()} FACTION FAVOR`);
        ns.tprint("Example:");
        ns.tprint(`> run ${ns.getScriptName()} "The Black Hand" 150`);
        return;
    }
    ns.disableLog("ALL");
    ns.setTitle("Remaining time for donations - " + faction);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        ns.clearLog();
        const player = ns.getPlayer();
        const share = ns.getSharePower();
        const repRequired = ns.formulas.reputation.calculateFavorToRep(favor);
        const currentRep = ns.singularity.getFactionRep(faction);
        const remainingRep = repRequired - currentRep;
        ns.print(currentRep + " " + repRequired + " " + remainingRep);
        //1 cycle = 200ms
        const cycleTime = 0.2; //s
        const repPerCycle = ns.formulas.work.factionGains(player, "hacking", 0).reputation;
        const sleeveRepCycle = isSleeveWorking(7, faction);
        ns.print("Player rep/s - " + repPerCycle * 5);
        ns.print("Sleeve rep/s - " + sleeveRepCycle * 5);
        ns.print("Share Power: " + share);
        const cyclesRemaining = remainingRep / ((repPerCycle + sleeveRepCycle) * share);
        const timeRemaining = cyclesRemaining * cycleTime;
        ns.print(`${formatHhMmSs(timeRemaining)} until Favor to Donate`);
        ns.print(ns.formatPercent(remainingRep / repRequired) + " left");
        await ns.sleep(1000);
    }
    // 0 if no sleeves working for faction
    function isSleeveWorking(sleevesNum, faction) {
        for (let i = 0; i < sleevesNum; i++) {
            const task = ns.sleeve.getTask(i);
            if (task?.type === "FACTION" && task.factionName === faction) {
                return getSleeveGains(i, task.factionWorkType);
            }
        }
        return 0;
    }
    function getSleeveGains(sleeveId, workType) {
        const sleevePerson = ns.sleeve.getSleeve(sleeveId);
        return ns.formulas.work.factionGains(sleevePerson, workType, 0).reputation;
    }
    function formatHhMmSs(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainder = seconds % 3600;
        const minutes = Math.floor(remainder / 60);
        const sec = Math.floor(remainder % 60);
        return `${hours}:${minutes}:${sec}`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwVG9Eb25hdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWF0aC9yZXBUb0RvbmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQ0FBK0M7QUFDL0MsdUZBQXVGO0FBSXZGLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDL0IsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRVYsV0FBVztJQUNYLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsTUFBTSxPQUFPLEdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQyxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUN6QixFQUFFLENBQUMsTUFBTSxDQUFDLDJEQUEyRCxDQUFDLENBQUM7UUFDdkUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RCLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDOUQsT0FBTztLQUNSO0lBRUQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixFQUFFLENBQUMsUUFBUSxDQUFDLGlDQUFpQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBRXpELGlEQUFpRDtJQUNqRCxPQUFPLElBQUksRUFBRTtRQUNYLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNkLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVB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