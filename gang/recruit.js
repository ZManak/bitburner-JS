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
        let i = 0;
        const canRecruit = ns.gang.canRecruitMember();
        //Recruit members until gang is full
        if (canRecruit) {
            ns.gang.recruitMember("Unit-00" + i);
            ns.gang.setMemberTask("Unit-00" + i, "Train Combat");
            i++;
        }
        ns.printf("Gang size: " + crew.length);
        ns.printf("Gang power: " + gangInfo.power);
        for (const member of crew) {
            const memberInfo = ns.gang.getMemberInformation(member);
            if ((memberInfo.agi && memberInfo.def && memberInfo.str && memberInfo.dex) >
                170 &&
                memberInfo.str_asc_mult < 1.5) {
                ns.gang.ascendMember(member);
            }
            if (memberInfo.agi > 600 && memberInfo.task === "Train Combat") {
                ns.gang.setMemberTask(member, "Terrorism");
            }
            //Augmentate trained members
            installAugs(member, ns.getServerMoneyAvailable("home"));
        }
        //Set members to Human Traficking if members doing Terrorism is greater than 3
        const terrorist = crew.filter((member) => ns.gang.getMemberInformation(member).task === "Terrorism");
        ns.print(terrorist[0] + terrorist[1]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjcnVpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nYW5nL3JlY3J1aXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixpREFBaUQ7SUFDakQsT0FBTyxJQUFJLEVBQUU7UUFDWCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNyQixJQUFJO2dCQUNGLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzFCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7UUFDRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDOUMsb0NBQW9DO1FBQ3BDLElBQUksVUFBVSxFQUFFO1lBQ2QsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDckQsQ0FBQyxFQUFFLENBQUM7U0FDTDtRQUVELEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FB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