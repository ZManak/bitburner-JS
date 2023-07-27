/** @param {NS} ns */
import { colors } from "./aux/palette.js";

export async function main(ns) {
  ns.disableLog("sleep");
  ns.disableLog("getServerMoneyAvailable");

  const args = ns.flags([["help", false]]);
  if (args.help) {
    ns.tprint("This script will buy servers until limit is reached.");
    ns.tprint(`Usage: run ${ns.getScriptName()}`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()}`);
    return;
  }

  const ram = [];
  const cost = [];
  const list = [];
  let availableServers = 25 - ns.getPurchasedServers().length;

  for (let i = 0; i < 17; ++i) {
    let ramValue = 2 ** i;
    let costValue = ns.getPurchasedServerCost(ramValue);
    ram.push(ramValue);
    cost.push(costValue);
    let str = `${i}. ${ns.formatRam(ramValue)}		___ ${ns.formatNumber(
      costValue
    )} $ / ${availableServers}x(${ns.formatNumber(
      costValue * availableServers
    )} $)`;
    list[i] = str;
  }
  let input = await ns.prompt("Please select servers RAM:", {
    type: "select",
    choices: list,
  });
  let selectRAM = ram[parseInt(input.split("."))];
  let input2 = await ns.prompt(`How many? (${availableServers} max)`, {
    type: "text",
  });
  let numServers = parseInt(input2);
  if (numServers > availableServers) {
    ns.tprintf(colors.red + "ERROR: Exceeded max servers. Order Canceled.");
  }

  // Continuously try to purchase servers until we've reached the maximum
  // amount of servers
  let i = 0;
  while (i < numServers && numServers <= availableServers) {
    //Server name
    let server = "serv-" + (i + 1);
    if (
      ns.getServerMoneyAvailable("home") >
      ns.getPurchasedServerCost(parseInt(selectRAM))
    ) {
      let hostname = ns.purchaseServer(server, selectRAM);
      ns.tprintf(colors.yellow + hostname + "/" + ns.formatRam(selectRAM));
      i++;
    }

    await ns.sleep(10);
  }
}
