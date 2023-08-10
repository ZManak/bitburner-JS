export async function main(ns) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        ns.clearLog();
        if (!ns.gang.inGang()) {
            try {
                ns.gang.createGang("Slum Snakes");
                ns.print("Gang created");
            }
            catch (e) {
                ns.tprint("Gang already exists");
            }
        }
        const crew = ns.gang.getMemberNames();
        const gangInfo = ns.gang.getGangInformation();
        const canRecruit = ns.gang.canRecruitMember();
        //Recruit members until gang is full
        if (canRecruit) {
            const id = crypto.randomUUID();
            ns.gang.recruitMember(`Unit-${id}`);
            ns.gang.setMemberTask(`Unit-${id}`, "Train Combat");
        }
        ns.printf("Gang size: " + crew.length);
        ns.printf("Gang power: " + gangInfo.power);
        for (const member of crew) {
            const memberInfo = ns.gang.getMemberInformation(member);
            const ascendResults = ns.gang.getAscensionResult(member);
            if (ascendResults !== undefined && ascendResults.agi >= 7) {
                ns.gang.ascendMember(member);
            }
            if (memberInfo.agi > 600 && memberInfo.task === "Train Combat") {
                ns.gang.setMemberTask(member, "Terrorism");
            }
            //Augmentate trained members
            if (memberInfo.agi_asc_mult > 7) {
                installAugs(member, ns.getServerMoneyAvailable("home"));
            }
        }
        //Set members to Human Traficking if members doing Terrorism is greater than 3
        const terrorist = crew.filter((member) => ns.gang.getMemberInformation(member).task === "Terrorism");
        terrorist.length > 3
            ? ns.gang.setMemberTask(terrorist[0], "Human Trafficking")
            : null;
        await ns.sleep(1000);
    }
    function installAugs(member, funds) {
        const equipment = ns.gang.getEquipmentNames();
        const augs = equipment.filter((item) => ns.gang.getEquipmentType(item) === "Augmentation");
        const combatAugs = augs.filter((item) => ns.gang.getEquipmentStats(item).str ||
            ns.gang.getEquipmentStats(item).def ||
            ns.gang.getEquipmentStats(item).dex ||
            ns.gang.getEquipmentStats(item).agi);
        for (const aug of combatAugs) {
            if (funds > ns.gang.getEquipmentCost(aug) &&
                !ns.gang.getMemberInformation(member).augmentations.includes(aug)) {
                ns.gang.purchaseEquipment(member, aug)
                    ? ns.print(`Succesfully installed ${aug} in ${member}`)
                    : null;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjcnVpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nYW5nL3JlY3J1aXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixpREFBaUQ7SUFDakQsT0FBTyxJQUFJLEVBQUU7UUFDWCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNyQixJQUFJO2dCQUNGLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFDRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUMsb0NBQW9DO1FBQ3BDLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FB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