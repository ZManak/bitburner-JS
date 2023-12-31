export function main(ns) {
    //Hardcoded sleeves
    const crimes = ns.enums.CrimeType;
    const sleeves = 8;
    for (let i = 0; i < sleeves; i++) {
        const clone = ns.sleeve.getSleeve(i);
        ns.formulas.work.crimeSuccessChance(clone, crimes.homicide) > 0.45
            ? ns.sleeve.setToCommitCrime(i, crimes.homicide)
            : ns.sleeve.setToCommitCrime(i, crimes.mug);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29DcmltaW5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zbGVldmVzL2dvQ3JpbWluYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ3pCLG1CQUFtQjtJQUNuQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztJQUNsQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUk7WUFDaEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQztBQUNILENBQUMifQ==