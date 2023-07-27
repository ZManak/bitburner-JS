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
    let serversRam = 64;
    ns.disableLog("ALL");
    ns.print("Automation started");
    if (ns.fileExists("4s.js", "home") && !ns.isRunning("4s.js", "home")) {
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
        //Buy nickofolas Congruity Implant
        if (!ns.singularity.isBusy() &&
            ns.grafting
                .getGraftableAugmentations()
                .includes("nickofolas Congruity Implant") &&
            ns.getServerMoneyAvailable("home") > 150e12) {
            ns.singularity.travelToCity("New Tokyo");
            ns.grafting.graftAugmentation("nickofolas Congruity Implant");
        }
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
        if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
            await buyServers(ns, serversRam);
            serversRam = serversRam * 2;
        }
        //Upgrade servers
        if (ns.getPurchasedServers().length > 0 &&
            ns.getPurchasedServerUpgradeCost(ns.getPurchasedServers()[0], serversRam) <
                ns.getServerMoneyAvailable("home") * 0.7) {
            await upgradeServers(ns, serversRam);
            serversRam = serversRam * 2;
        }
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
        //Backdoor useful servers
        for (let i = 0; i < usefulServers.length; i++) {
            const server = ns.getServer(usefulServers[i]);
            if (ns.hasRootAccess(usefulServers[i]) &&
                server.backdoorInstalled === false) {
                ns.printf("Installing backdoor on " + usefulServers[i]);
                ns.run("findServer.js", 1, usefulServers[i]);
                await ns.sleep(5000);
                await ns.singularity.installBackdoor();
                await ns.sleep(5000);
                ns.printf("Backdoor on " + usefulServers[i]);
                ns.singularity.connect("home");
            }
        }
        //Get into Stock Market
        if (!ns.stock.has4SDataTIXAPI() && player.money > 35e9) {
            ns.stock.purchaseWseAccount();
            ns.stock.purchase4SMarketData();
            ns.stock.purchaseTixApi();
            ns.stock.purchase4SMarketDataTixApi();
            //ns.exec("4s.js", "home");
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
    async function buyServers(ns, ram) {
        const servers = ns.getPurchasedServers();
        const serverCost = ns.getPurchasedServerCost(ram);
        const maxServers = ns.getPurchasedServerLimit();
        const money = ns.getServerMoneyAvailable("home");
        for (let i = 0; i < maxServers; i++) {
            if (money > serverCost && servers.length < maxServers) {
                try {
                    const server = ns.purchaseServer("Servo-", ram);
                    ns.print("Purchased server " + server + " with " + ram + "GB of RAM");
                }
                catch (e) {
                    ns.print("Failed to purchase server");
                }
            }
        }
    }
    async function upgradeServers(ns, ram) {
        const servers = ns.getPurchasedServers();
        const maxRam = ns.getPurchasedServerMaxRam();
        const cost = ns.getPurchasedServerUpgradeCost(servers[0], ram);
        const money = ns.getServerMoneyAvailable("home");
        if (ram < maxRam && money * 0.7 > cost) {
            for (const server of servers) {
                const success = ns.upgradePurchasedServer(server, ram);
                if (success) {
                    ns.print("Upgraded server " + server + " to " + ram + "GB of RAM");
                }
                else {
                    return;
                }
            }
        }
    }
}
//rate augmentations
/* for (const [ , ] of ) */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BpbG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dG9waWxvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLE1BQU0sSUFBSSxHQUFHO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYztRQUNkLGVBQWU7UUFDZixjQUFjO1FBQ2Qsb0JBQW9CO0tBQ3JCLENBQUM7SUFDRixNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sYUFBYSxHQUFHO1FBQ3BCLFVBQVU7UUFDVixvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGVBQWU7UUFDZixhQUFhO1FBQ2IsY0FBYztRQUNkLFlBQVk7UUFDWixLQUFLO1FBQ0wsZUFBZTtRQUNmLGFBQWE7S0FDZCxDQUFDO0lBQ0YsTUFBTSxhQUFhLEdBQUc7UUFDcEIsVUFBVTtRQUNWLFNBQVM7UUFDVCxnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLFVBQVU7UUFDVixlQUFlO1FBQ2YsZUFBZTtRQUNmLGFBQWE7UUFDYixhQUFhO1FBQ2IsY0FBYztRQUNkLHVCQUF1QjtRQUN2QixZQUFZO0tBQ2IsQ0FBQztJQUVGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUVwQixFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUUvQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDcEUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzVC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