/** @param {NS} ns **/
import { colors } from "./aux/palette.js";

export async function main(ns) {
  ns.disableLog("ALL");

  ns.moveTail(620, 0);
  ns.resizeTail(1500, 750);
  ns.tail();

  let servers = scanServers();

  while (true) {
    rootServers(servers);
    displayServers(servers);
    await maxOutServers(servers);
    await ns.sleep(0);
    ns.clearLog();
  }

  function scanServers() {
    let servers = ["home"];
    for (let i = 0; i < servers.length; i++) {
      var thisScan = ns.scan(servers[i]);
      // Loop through results of the scan, and add any new servers
      for (let j = 0; j < thisScan.length; j++) {
        // If this server isn't in servers, add it
        if (servers.indexOf(thisScan[j]) === -1) {
          servers.push(thisScan[j]);
        }
      }
    }
    return servers;
  }

  function displayServers(servers) {
    var hackedServers = [];
    var toHackServers = [];
    var output = "";
    for (let i = 0; i < servers.length; i++) {
      if (ns.getServerMaxMoney(servers[i]) > 0) {
        if (ns.hasRootAccess(servers[i])) hackedServers.push(servers[i]);
        else toHackServers.push(servers[i]);
        //ns.print(servers[i])
      }
    }
    ns.print("   " + hackedServers.length + " Hacked Servers:");
    for (let i = 0; i < hackedServers.length; i++) {
      output = "";
      var perc;
      var maxM = ns.getServerMaxMoney(hackedServers[i]);
      var minL = ns.getServerMinSecurityLevel(hackedServers[i]);
      var money = ns.getServerMoneyAvailable(hackedServers[i]);
      var security = ns.getServerSecurityLevel(hackedServers[i]);
      if (maxM != money) {
        output += " \uD83C\uDF31 " + hackedServers[i] + " ";
        perc = parseFloat((money / maxM) * 100).toFixed(2);
      } else if (minL != security) {
        output += " \uD83D\uDCA4  " + hackedServers[i] + " ";
        perc = parseFloat((minL / security) * 100).toFixed(2);
      } else {
        output += " \uD83D\uDCA2 " + hackedServers[i] + " ";
        perc = 100;
      }
      if (perc != 0) {
        var aux = perc;
        for (let j = output.length; j < 25; j++) output += "_";
        output += "[";
        for (let j = 0; j < 100; j++) {
          if (aux >= 1) {
            output += "|";
            aux--;
          } else {
            output += "-";
          }
        }
        output += "]" + perc.toString() + "%";
      }
      ns.print(output);
    }
    ns.print("");
    output =
      "   " + toHackServers.length + " To Hack Servers: " + toHackServers[0];
    for (let i = 1; i < toHackServers.length; i++)
      output += ", " + toHackServers[i];
    ns.print(output);
  }

  function rootServers(servers) {
    let rootedServers = [];
    for (let i = 0; i < servers.length; i++) {
      let server = servers[i];
      let port = 0;
      if (!ns.hasRootAccess(server)) {
        if (ns.fileExists("brutessh.exe")) {
          ns.brutessh(server);
          port++;
        }
        if (ns.fileExists("ftpcrack.exe")) {
          ns.ftpcrack(server);
          port++;
        }
        if (ns.fileExists("relaysmtp.exe")) {
          ns.relaysmtp(server);
          port++;
        }
        if (ns.fileExists("httpworm.exe")) {
          ns.httpworm(server);
          port++;
        }
        if (ns.fileExists("sqlinject.exe")) {
          ns.sqlinject(server);
          port++;
        }
        if (
          ns.getServerNumPortsRequired(server) <= port &&
          ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()
        ) {
          ns.nuke(server);
          ns.tprintf(colors.yellow + server + "==> gained root access /////");
        }
      } else {
        rootedServers.push[server];
      }
    }
    return rootServers;
  }

  async function maxOutServers(servers) {
    let allServers = servers;
    let script = "base.js";
    let script2 = "base2.js";
    for (let i = 0; i < allServers.length; i++) {
      var maxM = ns.getServerMaxMoney(allServers[i]);
      var minL = ns.getServerMinSecurityLevel(allServers[i]);
      var money = ns.getServerMoneyAvailable(allServers[i]);
      var security = ns.getServerSecurityLevel(allServers[i]);
      let percM = parseInt((money / maxM) * 100);
      let percL = parseInt((minL / security) * 100);
      if (ns.getServerMaxRam(allServers[i]) != 0) {
        if (maxM > 0) {
          if (percM < 90 && percL < 90) {
            for (var j = 0; j < servers.length; j++)
              await hackServer(script2, servers[j], servers[i], maxM, minL);
          } else {
            await hackServer(script, servers[i], servers[i], maxM, minL);
          }
        } else {
        }
      }
    }

    async function hackServer(script, server, hackServer, maxM, minL) {
      let ram = (ns.getServerMaxRam(server) / 100) * 99;
      if (ram < ns.getServerMaxRam(server) - ns.getServerUsedRam(server)) {
        let thread = Math.floor(ram / ns.getScriptRam(script));
        await ns.scp(script, server);
        ns.exec(script, server, thread, hackServer, maxM, minL);
      }
    }
  }
}
