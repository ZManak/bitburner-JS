export async function main(ns) {
    const sleeves = 7;
    for (let i = 0; i < sleeves; i++) {
        const augs = ns.sleeve.getSleevePurchasableAugs(i);
        augs.sort((a, b) => b.cost - a.cost);
        for (const aug of augs) {
            const installed = ns.sleeve.purchaseSleeveAug(i, aug.name);
            if (installed) {
                ns.tprint("Installed " + aug.name + " on sleeve " + i);
            }
            else {
                ns.tprint("Failed to install " + aug.name + " on sleeve " + i);
            }
        }
        ns.tprint("___________________________________________________________");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbEF1Z3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2xlZXZlcy9pbnN0YWxsQXVncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQztJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLFNBQVMsRUFBRTtnQkFDYixFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN4RDtpQkFBTTtnQkFDTCxFQUFFLENBQUMsTUFBTSxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2hFO1NBQ0Y7UUFDRCxFQUFFLENBQUMsTUFBTSxDQUFDLDZEQUE2RCxDQUFDLENBQUM7S0FDMUU7QUFDSCxDQUFDIn0=