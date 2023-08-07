import { colors } from "utils/palette.js";
//Sleeves number is hardcoded
//Track the status of each sleeve
//Shows INT
//Shows stored cycles
//Shows current task
export async function main(ns) {
    ns.setTitle("Sleeves Status");
    // eslint-disable-next-line no-constant-condition
    while (true) {
        ns.disableLog("ALL");
        ns.clearLog();
        const numSleeves = 7;
        for (let i = 0; i < numSleeves; i++) {
            const clone = ns.sleeve.getSleeve(i);
            const cloneTask = ns.sleeve.getTask(i);
            ns.printf("Sleeve %d:", i);
            ns.printf(colors.red + "HP: %d / %d", clone.hp.current, clone.hp.max);
            ns.printf(colors.white + "Str: %d Def: %d Dex: %d Agi: %d", clone.skills.strength, clone.skills.defense, clone.skills.dexterity, clone.skills.agility);
            ns.printf(colors.green + "Hack: %d " + colors.magenta + "Cha: %d", clone.skills.hacking, clone.skills.charisma);
            ns.printf(colors.cyan + "Int: %d", clone.skills.intelligence);
            ns.printf("Cycles: %d", clone.storedCycles);
            if (cloneTask?.type === "CRIME") {
                ns.printf("Task: %s %s", cloneTask.type, cloneTask.crimeType.toUpperCase());
            }
            else if (cloneTask?.type === "CLASS") {
                ns.printf("Task: %s %s", cloneTask.type, cloneTask.classType.toUpperCase());
            }
            else if (cloneTask?.type === "COMPANY") {
                ns.printf("Task: %s", cloneTask.companyName.toUpperCase());
            }
            else {
                ns.printf("Task: %s", cloneTask?.type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NsZWV2ZXMvc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUxQyw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDLFdBQVc7QUFDWCxxQkFBcUI7QUFDckIsb0JBQW9CO0FBRXBCLE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDL0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLGlEQUFpRDtJQUNqRCxPQUFPLElBQUksRUFBRTtRQUNYLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RFLEVBQUUsQ0FBQyxNQUFNLENBQ1AsTUFBTSxDQUFDLEtBQUssR0FBRyxpQ0FBaUMsRUFDaEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUNwQixLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFDdEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQ3JCLENBQUM7WUFDRixFQUFFLENBQUMsTUFBTSxDQUNQLE1BQU0sQ0FBQyxLQUFLLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUN2RCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDcEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3RCLENBQUM7WUFDRixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsU0FBUyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDOUQsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxFQUFFLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQ1AsYUFBYSxFQUNiLFNBQVMsQ0FBQyxJQUFJLEVBQ2QsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQzthQUNIO2lCQUFNLElBQUksU0FBUyxFQUFFLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3RDLEVBQUUsQ0FBQyxNQUFNLENBQ1AsYUFBYSxFQUNiLFNBQVMsQ0FBQyxJQUFJLEVBQ2QsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQzthQUNIO2lCQUFNLElBQUksU0FBUyxFQUFFLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ3hDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzthQUM1RDtpQkFBTTtnQkFDTCxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFDRCxFQUFFLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBQ0QsdURBQXVEO0FBQ3ZELGdEQUFnRDtBQUNoRCw4RUFBOEU7QUFDOUUsZ0RBQWdEIn0=