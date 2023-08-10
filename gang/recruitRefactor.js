export async function main(ns) {
    const gangName = "Slum Snakes";
    const recruitTask = "Train Combat";
    const upgradeTask = "Terrorism";
    const augmentType = "Augmentation";
    const minAscendAgi = 7;
    const minAugmentAgiMult = 7;
    const maxTerrorists = 3;
    // Create gang if it doesn't exist
    if (!ns.gang.inGang()) {
        try {
            ns.gang.createGang(gangName);
            ns.print("Gang created");
        }
        catch (e) {
            ns.tprint("Gang already exists");
        }
    }
    // Define the main function to be called periodically
    function recruit() {
        const members = ns.gang.getMemberNames();
        const funds = ns.getServerMoneyAvailable("home");
        const canRecruit = ns.gang.canRecruitMember();
        const terrorist = members.filter((member) => ns.gang.getMemberInformation(member).task === upgradeTask);
        if (canRecruit) {
            const id = crypto.randomUUID();
            ns.gang.recruitMember(`Unit-${id}`);
            ns.gang.setMemberTask(`Unit-${id}`, "Train Combat");
        }
        for (const member of members) {
            const memberInfo = ns.gang.getMemberInformation(member);
            const ascendResults = (ns.gang.getAscensionResult(member));
            if (ascendResults?.agi >= minAscendAgi) {
                ns.gang.ascendMember(member);
            }
            if (memberInfo.agi > 600 && memberInfo.task === recruitTask) {
                ns.gang.setMemberTask(member, upgradeTask);
            }
            if (memberInfo.agi_asc_mult > minAugmentAgiMult) {
                const installedAugs = new Set(memberInfo.augmentations);
                const equipment = ns.gang.getEquipmentNames();
                const augs = equipment.filter((item) => ns.gang.getEquipmentType(item) === augmentType);
                const combatAugs = augs.filter((item) => ns.gang.getEquipmentStats(item).str ||
                    ns.gang.getEquipmentStats(item).def ||
                    ns.gang.getEquipmentStats(item).dex ||
                    ns.gang.getEquipmentStats(item).agi);
                for (const aug of combatAugs) {
                    if (funds > ns.gang.getEquipmentCost(aug) &&
                        !installedAugs.has(aug)) {
                        ns.gang.purchaseEquipment(member, aug);
                        installedAugs.add(aug);
                    }
                }
                if (installedAugs.size > memberInfo.augmentations.length) {
                    ns.print(`Succesfully installed augs in ${member}`);
                }
            }
        }
        // Set members to a lucrative task if there are enough terrorists
        if (members.length >= 4 && terrorist.length > maxTerrorists) {
            ns.gang.setMemberTask(terrorist[0], "Human Trafficking");
        }
        // Print gang info
        const gangInfo = ns.gang.getGangInformation();
        ns.printf("Gang size: " + members.length);
        ns.printf("Gang power: " + gangInfo.power);
    }
    // Call the main function periodically
    setTimeout(recruit, 1000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjcnVpdFJlZmFjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dhbmcvcmVjcnVpdFJlZmFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDL0IsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDO0lBQy9CLE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUNuQyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDaEMsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDO0lBQ25DLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN2QixNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFFeEIsa0NBQWtDO0lBQ2xDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3JCLElBQUk7WUFDRixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzFCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDbEM7S0FDRjtJQUVELHFEQUFxRDtJQUNyRCxTQUFTLE9BQU87UUFDZCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FDOUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVB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