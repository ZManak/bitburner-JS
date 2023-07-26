export async function main(ns) {
    ns.singularity.upgradeHomeCores()
        ? ns.tprint("+1 Core")
        : ns.tprint("Failed to upgrade Cores. Cost: " +
            ns.formatNumber(ns.singularity.getUpgradeHomeCoresCost()));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2luZ3VsYXJpdHkvY29yZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsRUFBTTtJQUMvQixFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO1FBQy9CLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUN0QixDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FDUCxpQ0FBaUM7WUFDL0IsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FDNUQsQ0FBQztBQUNSLENBQUMifQ==