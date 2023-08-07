//4s.js will get interrupted by the sell script, and the sell script will get interrupted by 4s.js.
//This is because the sell script is running in the background, and 4s.js is running in the foreground.
//The solution is to run 4s.js in the background, and the sell script in the foreground.
import { value } from "stocks/portfolioValue";
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
        const netWorh = ns.getServerMoneyAvailable("home") + value(ns);
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
        if (ns.getHackingLevel() > 390 &&
            ns.getServerMoneyAvailable("home") >
                ns.singularity.getDarkwebProgramCost(exes[3]) &&
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
        //Join relevant factions
        for (const faction of factionOffers) {
            if (canonFactions.includes(faction) &&
                !player.factions.includes(faction)) {
                ns.singularity.joinFaction(faction);
                ns.printf("Joined " + faction);
            }
        }
        //Work for factions
        if (!ns.singularity.isBusy() && !ns.gang.inGang()) {
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
            //ns.exec("/singularity/installAugs.js", "home");
        }
        //Buy servers when possible
        if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
            buyServers(ns, serversRam);
            serversRam = serversRam * 2;
        }
        //Upgrade servers & increase next upgrade ram
        if (ns.getPurchasedServers().length > 0 &&
            ns.getPurchasedServerUpgradeCost(ns.getPurchasedServers()[0], serversRam) <
                ns.getServerMoneyAvailable("home") * 1.4) {
            upgradeServers(ns, serversRam) ? (serversRam = serversRam * 2) : null;
        }
        /*if (
          ns.formulas.work.crimeSuccessChance(player, "Larceny") < 0.75 &&
          !ns.singularity.isBusy()
        ) {
          ns.singularity.commitCrime("Shoplift", false);
        } else if (!ns.singularity.isBusy()) {
          ns.singularity.commitCrime("Larceny", false);
        } */
        //Install backdoors on canon servers
        await installBackdoor(canonServers);
        /* for (let i = 0; i < canonServers.length; i++) {
          const server = ns.getServer(canonServers[i]);
          if (
            ns.hasRootAccess(canonServers[i]) &&
            server.backdoorInstalled === false
          ) {
            ns.printf("Installing backdoor on " + canonServers[i]);
            ns.run("findServer.js", 1, canonServers[i]);
            await ns.sleep(5000);
            await ns.singularity.installBackdoor();
            await ns.sleep(5000);
            ns.printf("Backdoor on " + canonServers[i]);
            ns.singularity.connect("home");
          }
        } */
        //Backdoor useful servers
        await installBackdoor(serverList);
        /* for (let i = 0; i < serverList.length; i++) {
          const server = ns.getServer(serverList[i]);
          if (
            ns.hasRootAccess(serverList[i]) &&
            server.backdoorInstalled === false
          ) {
            ns.printf("Installing backdoor on " + serverList[i]);
            ns.run("findServer.js", 1, serverList[i]);
            await ns.sleep(5000);
            await ns.singularity.installBackdoor();
            await ns.sleep(5000);
            ns.printf("Backdoor on " + serverList[i]);
            ns.singularity.connect("home");
          }
        } */
        //Get into Stock Market
        if (!ns.stock.has4SDataTIXAPI() && player.money > 35e9) {
            ns.stock.purchaseWseAccount();
            ns.stock.purchase4SMarketData();
            ns.stock.purchaseTixApi();
            ns.stock.purchase4SMarketDataTixApi();
            ns.print("Purchased 4S Data and TIX API");
            //ns.exec("4s.js", "home");
        }
        ns.print("End of loop");
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
                    ns.print("Upgraded server " + server + " to " + ram + "GB of RAM");
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
                await ns.sleep(5000);
                await ns.singularity.installBackdoor();
                await ns.sleep(5000);
                ns.printf("Backdoor on " + serverList[i]);
                ns.singularity.connect("home");
            }
        }
    }
}
//rate augmentations
/* for (const [ , ] of ) */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3BpbG90LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dG9waWxvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtR0FBbUc7QUFDbkcsdUdBQXVHO0FBQ3ZHLHdGQUF3RjtBQUl4RixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUMsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixNQUFNLElBQUksR0FBRztRQUNYLGNBQWM7UUFDZCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGNBQWM7UUFDZCxlQUFlO1FBQ2YsY0FBYztRQUNkLG9CQUFvQjtLQUNyQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN4RSxNQUFNLFVBQVUsR0FBRztRQUNqQixVQUFVO1FBQ1Ysb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCxlQUFlO1FBQ2YsYUFBYTtRQUNiLGNBQWM7UUFDZCxZQUFZO1FBQ1osS0FBSztRQUNMLGVBQWU7UUFDZixhQUFhO0tBQ2QsQ0FBQztJQUNGLE1BQU0sYUFBYSxHQUFHO1FBQ3BCLFVBQVU7UUFDVixTQUFTO1FBQ1QsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixVQUFVO1FBQ1YsZUFBZTtRQUNmLGVBQWU7UUFDZixhQUFhO1FBQ2IsYUFBYTtRQUNiLGNBQWM7UUFDZCx1QkFBdUI7UUFDdkIsWUFBWTtLQUNiLENBQUM7SUFFRixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRS9COztRQUVJO0lBRUosT0FBTyxJQUFJLEVBQUU7UUFDWCxNQUFNLE9BQU8s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