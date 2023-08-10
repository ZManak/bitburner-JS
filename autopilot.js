//4s.js will get interrupted by the sell script, and the sell script will get interrupted by 4s.js.
//This is because the sell script is running in the background, and 4s.js is running in the foreground.
//The solution is to run 4s.js in the background, and the sell script in the foreground.
//import { value } from "stocks/portfolioValue";
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
    const serverList = [
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
    ns.setTitle("Singularity Automation");
    ns.disableLog("ALL");
    ns.print("Automation started");
    /* if (ns.fileExists("4s.js", "home") && !ns.isRunning("4s.js", "home")) {
      ns.run("4s.js", 1, "home");
    } */
    while (true) {
        //ns.clearLog();
        //const netWorh = ns.getServerMoneyAvailable("home") + value(ns);
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
            !ns.singularity
                .getOwnedAugmentations()
                .includes("nickofolas Congruity Implant") &&
            ns.grafting
                .getGraftableAugmentations()
                .includes("nickofolas Congruity Implant") &&
            ns.getServerMoneyAvailable("home") > 150e12) {
            ns.singularity.travelToCity("New Tokyo");
            ns.grafting.graftAugmentation("nickofolas Congruity Implant");
        }
        //Buy programs
        if (player.money > 300000 && !ns.hasTorRouter()) {
            ns.singularity.purchaseTor();
            ns.printf("Purchased TOR");
            ns.toast("Purchased TOR");
        }
        if (ns.getHackingLevel() > 550 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[2]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[2], "home")) {
            ns.singularity.purchaseProgram(exes[2]);
            ns.printf("Purchased RELAY");
        }
        if (ns.getHackingLevel() > 550 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[3]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[3], "home")) {
            ns.singularity.purchaseProgram(exes[3]);
            ns.printf("Purchased WORM");
        }
        if (ns.getHackingLevel() > 700 &&
            player.money > ns.singularity.getDarkwebProgramCost(exes[4]) &&
            ns.hasTorRouter() &&
            !ns.fileExists(exes[4], "home")) {
            ns.singularity.purchaseProgram(exes[4]);
            ns.printf("Purchased SQLInject");
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
        if (!ns.singularity.isBusy() && player.factions.includes("Daedalus")) {
            ns.singularity.workForFaction("Daedalus", "hacking", false);
        }
        else if (!ns.singularity.isBusy()) {
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
            //ns.run("/singularity/installAugs.js");
        }
        //Buy servers when possible
        if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
            buyServers(ns, serversRam);
            serversRam = serversRam * 2;
        }
        //Upgrade servers & increase next upgrade ram
        if (ns.getPurchasedServers().length > 0 &&
            ns.getPurchasedServerUpgradeCost(ns.getPurchasedServers()[0], ns.getServer(ns.getPurchasedServers()[14]).maxRam) <
                ns.getServerMoneyAvailable("home") * 1.4) {
            upgradeServers(ns, ns.getServer(ns.getPurchasedServers()[14]).maxRam * 2);
        }
        //Install backdoors on canon servers
        await installBackdoor(canonServers);
        //Backdoor useful servers
        await installBackdoor(serverList);
        //Get into Stock Market
        if (!ns.stock.has4SDataTIXAPI() && player.money > 35e9) {
            ns.stock.purchaseWseAccount();
            ns.stock.purchase4SMarketData();
            ns.stock.purchaseTixApi();
            ns.stock.purchase4SMarketDataTixApi();
            ns.print("Purchased 4S Data and TIX API");
            //ns.exec("4s.js", "home");
        }
        ns.toast("Singularity Loop STATUS: ON", "success", 1000);
        await ns.sleep(1500);
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
            ns.toast("Created " + exe, "info");
        }
        await ns.sleep(0);
    }
    function buyServers(ns, ram) {
        const servers = ns.getPurchasedServers();
        const serverCost = ns.getPurchasedServerCost(ram);
        const maxServers = ns.getPurchasedServerLimit();
        const money = ns.getServerMoneyAvailable("home");
        for (let i = 0; i < maxServers; i++) {
            if (money > serverCost && servers.length < maxServers) {
                try {
                    const server = ns.purchaseServer("Servo-", ram);
                    ns.print("Purchased server " + server + " with " + ns.formatRam(ram));
                }
                catch (e) {
                    ns.print("Failed to purchase server");
                }
            }
        }
    }
    function upgradeServers(ns, ram) {
        const servers = ns.getPurchasedServers();
        const maxRam = ns.getPurchasedServerMaxRam();
        const cost = ns.getPurchasedServerUpgradeCost(servers[0], ram);
        const money = ns.getServerMoneyAvailable("home");
        let upgraded = 0;
        if (ram < maxRam && money * 1.3 > cost) {
            for (const server of servers) {
                const success = ns.upgradePurchasedServer(server, ram);
                if (success) {
                    ns.print("Upgraded server " + server + " to " + ns.formatRam(ram));
                    upgraded = upgraded + 1;
                }
            }
        }
        if (upgraded === servers.length) {
            ns.print("Upgraded all servers to " + ram + "GB of RAM");
            return true;
        }
        else {
            return false;
        }
    }
    async function installBackdoor(serverList) {
        for (let i = 0; i < serverList.length; i++) {
            const server = ns.getServer(serverList[i]);
            if (ns.hasRootAccess(serverList[i]) &&
                server.backdoorInstalled === false) {
                ns.printf("Installing backdoor on " + serverList[i]);
                ns.run("findServer.js", 1, serverList[i]);
                await ns.sleep(2500);
                await ns.singularity.installBackdoor();
                await ns.sleep(1500);
                ns.printf("Backdoor on " + serverList[i]);
                ns.singularity.connect("home");
            }
        }
    }
}
//rate augmentations
/* for (const [ , ] of ) */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BpbG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dG9waWxvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtR0FBbUc7QUFDbkcsdUdBQXVHO0FBQ3ZHLHdGQUF3RjtBQUl4RixnREFBZ0Q7QUFFaEQsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixNQUFNLElBQUksR0FBRztRQUNYLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYztRQUNkLG9CQUFvQjtLQUNyQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4RSxNQUFNLFVBQVUsR0FBRztRQUNqQixVQUFVO1FBQ1Ysb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsYUFBYTtRQUNiLGNBQWM7UUFDZCxZQUFZO1FBQ1osS0FBSztRQUNMLGVBQWU7UUFDZixhQUFhO0tBQ2QsQ0FBQztJQUNGLE1BQU0sYUFBYSxHQUFHO1FBQ3BCLFVBQVU7UUFDVixTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixVQUFVO1FBQ1YsZUFBZTtRQUNmLGVBQWU7UUFDZixhQUFhO1FBQ2IsYUFBYTtRQUNiLGNBQWM7UUFDZCx1QkFBdUI7UUFDdkIsWUFBWTtLQUNiLENBQUM7SUFFRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9COztRQUVJO0lBRUosT0FBTyxJQUFJLEVBQUU7UUFDWCxnQkFBZ0I7UUFDaEIsaUVBQWlFO1FBQ2pFLE1BQU0sTUFBTSxHQUFH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