export async function main(ns, task, bladeTask) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
        ns.disableLog("ALL");
        ns.clearLog();
        const numSleeves = 6;
        for (let i = 0; i < numSleeves; i++) {
            const clone = ns.sleeve.getSleeve(i);
            const cloneTask = ns.sleeve.getTask(i);
            ns.printf("Sleeve %d:", i);
            ns.printf("HP: %d / %d", clone.hp.current, clone.hp.max);
            if (task.type === "BLADEBURNER") {
                ns.print("Assignated " +
                    task.actionName.toUpperCase() +
                    " - " +
                    task.actionType);
            }
            else if (task?.type === "CRIME") {
                ns.print("Commiting " + task.crimeType.toUpperCase());
            }
            else {
                ns.print(task?.type || "Healing");
            }
            if (clone.hp.current < 5 &&
                bladeTask?.actionName !== "Hyperbolic Regeneration Chamber") {
                ns.run("sleeves/heal.js");
                ns.toast(`Sleeve ${i} HP critical`, "error", 5000);
            }
            ns.print("_______________________________");
        }
        await ns.sleep(0);
    }
}
//  - Print out the current HP of each sleeve.This slee
//  - Print out the current task of each sleeve.
//  - If a sleeve's HP is below 5, set it to idle and display a toast message.
//  - Call this function from the main function.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxhZGVidXJuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2xlZXZlcy9ibGFkZWJ1cm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FDeEIsRUFBTSxFQUNOLElBQWdCLEVBQ2hCLFNBQWdDO0lBRWhDLGlEQUFpRDtJQUNqRCxPQUFPLElBQUksRUFBRTtRQUNYLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUMvQixFQUFFLENBQUMsS0FBSyxDQUNOLGFBQWE7b0JBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7b0JBQzdCLEtBQUs7b0JBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FDbEIsQ0FBQzthQUNIO2lCQUFNLElBQUksSUFBSSxFQUFFLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ2pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksU0FBUyxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUNFLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLENBQUM7Z0JBQ3BCLFNBQVMsRUFBRSxVQUFVLEtBQUssaUNBQWlDLEVBQzNEO2dCQUNBLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDMUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwRDtZQUNELEVBQUUsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztTQUM3QztRQUNELE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtBQUNILENBQUM7QUFDRCx1REFBdUQ7QUFDdkQsZ0RBQWdEO0FBQ2hELDhFQUE4RTtBQUM5RSxnREFBZ0QifQ==