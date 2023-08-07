export async function main(ns) {
    ns.singularity.upgradeHomeRam()
        ? ns.tprint("Upgraded RAM")
        : ns.tprint("Failed to upgrade RAM. Cost: " +
            ns.formatNumber(ns.singularity.getUpgradeHomeRamCost()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Npbmd1bGFyaXR5L3JhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQy9CLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1FBQzdCLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMzQixDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FDUCwrQkFBK0I7WUFDN0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FDMUQsQ0FBQztBQUNSLENBQUMifQ==