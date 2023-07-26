export async function main(ns) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        ns.clearLog();
        const crew = ns.gang.getMemberNames();
        const gangInfo = ns.gang.getGangInformation();
        let i = 0;
        let canRecruit = true;
        while (canRecruit) {
            ns.gang.recruitMember("Unit-0" + i);
            if (ns.gang.getMemberInformation("Unit-0" + i).task === "Idle") {
                ns.gang.setMemberTask("Unit-0" + i, "Train Combat");
            }
            i++;
            canRecruit = ns.gang.canRecruitMember();
            await ns.sleep(10000);
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
        }
        //Set members to Human Traficking if members doing Terrorism is greater than 3
        const terrorist = crew.filter((member) => ns.gang.getMemberInformation(member).task === "Terrorism");
        terrorist.length > 3
            ? ns.gang.setMemberTask(terrorist[0], "Human Traficking")
            : null;
        //const allEquipment = ns.gang.getEquipmentNames();
        await ns.sleep(1000);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjcnVpdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nYW5nL3JlY3J1aXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixpREFBaUQ7SUFDakQsT0FBTyxJQUFJLEVBQUU7UUFDWCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdEIsT0FBTyxVQUFVLEVBQUU7WUFDakIsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtnQkFDOUQsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNyRDtZQUNELENBQUMsRUFBRSxDQUFDO1lBQ0osVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFFRCxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLEtBQUssTUFBTSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3pCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEQsSUFDRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUM7Z0JBQ3BFLEdBQUc7Z0JBQ0wsVUFBVSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQzdCO2dCQUNBLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsSUFBSSxVQUFVLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtnQkFDOUQsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFFRCw4RUFBOEU7UUFDOUUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FDM0IsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FDdEUsQ0FBQztRQUNGLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNsQixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLGtCQUFrQixDQUFDO1lBQ3pELENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFVCxtREFBbUQ7UUFFbkQsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyJ9