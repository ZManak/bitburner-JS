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
}
//rate augmentations
/* for (const [ , ] of ) */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BpbG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dG9waWxvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLE1BQU0sSUFBSSxHQUFHO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYztRQUNkLGVBQWU7UUFDZixjQUFjO1FBQ2Qsb0JBQW9CO0tBQ3JCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sYUFBYSxHQUFHO1FBQ3BCLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGVBQWU7UUFDZixhQUFhO1FBQ2IsY0FBYztRQUNkLFlBQVk7UUFDWixLQUFLO1FBQ0wsZUFBZTtRQUNmLGFBQWE7S0FDZCxDQUFDO0lBQ0YsTUFBTSxhQUFhLEdBQUc7UUFDcEIsVUFBVTtRQUNWLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFVBQVU7UUFDVixlQUFlO1FBQ2YsZUFBZTtRQUNmLGFBQWE7UUFDYixhQUFhO1FBQ2IsY0FBYztRQUNkLHVCQUF1QjtRQUN2QixZQUFZO0tBQ2IsQ0FBQztJQUVGLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9CLElBQ0UsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzlCLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQzFCO1FBQ0EsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFD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