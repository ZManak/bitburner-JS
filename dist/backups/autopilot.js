export async function main(ns) {
    const exes = [
        "BruteSSH.exe",
        "FTPCrack.exe",
        "relaySMTP.exe",
        "HTTPWorm.exe",
        "SQLInject.exe",
        "AutoLink.exe",
        "ServerProfiler.exe",
    ];
    const canonServers = ["CSEC", "avmnite-02h", "I.I.I.I", "run4theh111z"];
    const usefulServers = [
        "iron-gym",
        "powerhouse-fitness",
        "snap-fitness",
        "crush-fitness",
        "rothman-uni",
        "zb-institute",
        "summit-uni",
        "nwo",
        "fulcrumassets",
        "fulcrumtech",
    ];
    const canonFactions = [
        "CyberSec",
        "NiteSec",
        "The Black Hand",
        "BitRunners",
        "Daedalus",
        "The Dark Army",
        "The Syndicate",
        "Tian Di Hui",
        "Slum Snakes",
        "The Covenant",
        "Speakers for the Dead",
        "Silhouette",
    ];
    ns.disableLog("ALL");
    ns.print("Automation started");
    if (ns.fileExists("4s.js", "home") &&
        !ns.isRunning("4s.js", "home") &&
        ns.stock.has4SDataTIXAPI()) {
        ns.run("4s.js", 1, "home");
    }
    while (true) {
        const player = ns.getPlayer();
        const factionOffers = ns.singularity.checkFactionInvitations();
        if (ns.getHackingLevel() < 25 && !ns.singularity.isBusy()) {
            ns.singularity.universityCourse("rothman university", "Computer Sciences");
            ns.printf("Taking computer classess");
            while (ns.getHackingLevel() < 50) {
                await ns.sleep(1000);
                ns.getHackingLevel();
            }
            ns.singularity.stopAction(); // Wait for the class to finish
        }
        //Create Programs
        await createProgram(ns, "BruteSSH.exe");
        await createProgram(ns, "FTPCrack.exe");
        //Join relevant factions
        for (const faction of factionOffers) {
            if (canonFactions.includes(faction) &&
                !player.factions.includes(faction)) {
                ns.singularity.joinFaction(faction);
                ns.printf("Joined " + faction);
            }
        }
        //Work for factions
        if (!ns.singularity.isBusy()) {
            for (const faction of player.factions) {
                if (canonFactions.includes(faction) && checkIfOwnedAugs(ns, faction)) {
                    ns.singularity.workForFaction(faction, "hacking", false);
                    ns.printf("Working for " + faction);
                }
            }
        }
        //Buy && Install the Red Pill---
        if (ns.singularity.getFactionRep("Daedalus") > 2.5e6 &&
            !ns.singularity.getOwnedAugmentations(true).includes("The Red Pill")) {
            ns.singularity.purchaseAugmentation("Daedalus", "The Red Pill");
            ns.exec("/singularity/installAugs.js", "home");
        }
        //buy servers when possible
        //Buy programs
        if (player.money > 300000 && !ns.hasTorRouter()) {
            ns.singularity.purchaseTor();
            ns.printf("Purchased TOR");
            ns.toast("Purchased TOR");
        }
        if (ns.getHackingLevel() > 390 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[3]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[3], "home")) {
            ns.singularity.purchaseProgram(exes[3]);
            ns.printf("Purchased RELAY");
        }
        if (ns.getHackingLevel() > 550 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[4]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[4], "home")) {
            ns.singularity.purchaseProgram(exes[4]);
            ns.printf("Purchased WORM");
        }
        if (ns.getHackingLevel() > 700 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[5]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[5], "home")) {
            ns.singularity.purchaseProgram(exes[5]);
            ns.printf("Purchased SQLInject");
        }
        //Buy servers
        /* if (
          ns.formulas.work.crimeSuccessChance(player, "Larceny") < 0.75 &&
          !ns.singularity.isBusy()
        ) {
          ns.singularity.commitCrime("Shoplift", false);
        } else if (!ns.singularity.isBusy()) {
          ns.singularity.commitCrime("Larceny", false);
        } */
        //Install backdoors on canon servers
        for (let i = 0; i < canonServers.length; i++) {
            const server = ns.getServer(canonServers[i]);
            if (ns.hasRootAccess(canonServers[i]) &&
                server.backdoorInstalled === false) {
                ns.printf("Installing backdoor on " + canonServers[i]);
                ns.run("findServer.js", 1, canonServers[i]);
                await ns.sleep(5000);
                await ns.singularity.installBackdoor();
                await ns.sleep(5000);
                ns.printf("Backdoor on " + canonServers[i]);
                ns.singularity.connect("home");
            }
        }
        //Get into Stock Market
        if (!ns.stock.has4SDataTIXAPI() && player.money > 35e9) {
            ns.stock.purchaseWseAccount();
            ns.stock.purchase4SMarketData();
            ns.stock.purchaseTixApi();
            ns.stock.purchase4SMarketDataTixApi();
            ns.exec("4s.js", "home");
        }
        await ns.sleep(0);
    }
    //Checks if owned all augs from faction
    function checkIfOwnedAugs(ns, faction) {
        const ownedAugs = ns.singularity.getOwnedAugmentations(true);
        const factionAugs = ns.singularity.getAugmentationsFromFaction(faction);
        let checked = 0;
        for (const aug of factionAugs) {
            if (ownedAugs.includes(aug)) {
                checked = checked + 1;
            }
        }
        ns.print("Owns " +
            checked +
            " out of " +
            factionAugs.length +
            " augs from " +
            faction);
        if (factionAugs.length === checked) {
            return false;
        }
        else {
            return true;
        }
    }
    async function createProgram(ns, exe) {
        if (!ns.fileExists(exe, "home") && !ns.singularity.isBusy()) {
            ns.singularity.createProgram(exe);
            while (!ns.fileExists(exe, "home")) {
                await ns.sleep(1000);
            }
            ns.print("Created " + exe);
            ns.toast("Created " + exe);
        }
        await ns.sleep(0);
    }
    function buyServers(ns, ram) {
        for (let i = ns.getPurchasedServers().length; i < ns.getPurchasedServerLimit(); i++) {
            const serverName = ns.purchaseServer("server-", ram);
            ns.print("Purchased " + serverName + " with " + ram + "GB of RAM");
        }
    }
}
//rate augmentations
/* for (const [ , ] of ) */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BpbG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JhY2t1cHMvYXV0b3BpbG90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDL0IsTUFBTSxJQUFJLEdBQUc7UUFDWCxjQUFjO1FBQ2QsY0FBYztRQUNkLGVBQWU7UUFDZixjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCxvQkFBb0I7S0FDckIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDeEUsTUFBTSxhQUFhLEdBQUc7UUFDcEIsVUFBVTtRQUNWLG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGFBQWE7UUFDYixjQUFjO1FBQ2QsWUFBWTtRQUNaLEtBQUs7UUFDTCxlQUFlO1FBQ2YsYUFBYTtLQUNkLENBQUM7SUFDRixNQUFNLGFBQWEsR0FBRztRQUNwQixVQUFVO1FBQ1YsU0FBUztRQUNULGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osVUFBVTtRQUNWLGVBQWU7UUFDZixlQUFlO1FBQ2YsYUFBYTtRQUNiLGFBQWE7UUFDYixjQUFjO1FBQ2QsdUJBQXVCO1FBQ3ZCLFlBQVk7S0FDYixDQUFDO0lBRUYsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixFQUFFLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFL0IsSUFDRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7UUFDOUIsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7UUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFDMUI7UUFDQSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFB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