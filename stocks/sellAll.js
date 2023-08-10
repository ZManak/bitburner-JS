export function main(ns) {
    //Sell all
    const symbols = ns.stock.getSymbols();
    let totalWorth = 0;
    for (const symbol of symbols) {
        totalWorth =
            totalWorth + ns.stock.sellStock(symbol, ns.stock.getMaxShares(symbol));
    }
    return totalWorth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsbEFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdG9ja3Mvc2VsbEFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDekIsVUFBVTtJQUNWLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEMsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1FBQzVCLFVBQVU7WUFDUixVQUFVLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDMUU7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIn0=