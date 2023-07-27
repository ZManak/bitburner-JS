import { w95 } from "/audio/w95.js";

/** @param {NS} ns */
export async function main(ns) {
  //Plays Windows95 startup tune
  let audio = new Audio("data:audio/mp3;base64," + w95);
  await audio.play();
  ns.exec("/box/stats.js", "home");
  ns.exec("all.js", "home");
  ns.exec("autopilot.js", "home");
  //Welcome msg with relevant information
  const player = ns.getPlayer();
  let maxRam = ns.getServerMaxRam("home");
  let usedRam = ns.getServerUsedRam("home");
  let freeRam = maxRam - usedRam;
  let scriptsOn = ns.ps("home");

  ns.tprintf(``);

  ns.tprint(`###### RESET #########
			Free RAM        : ${freeRam} GB ____ ${100 - (usedRam / maxRam) * 100} %
			ScriptXP/s      : ${ns.getTotalScriptExpGain()}
			Script Income   : ${ns.formatNumber(ns.getTotalScriptIncome()[0], 4)}

			Running scripts :`);

  for (let script of scriptsOn) {
    ns.tprint(`${script.filename} t= ${script.threads} args: ${script.args}
			${ns.getScriptRam(script.filename) * script.threads} GB /  ${ns.getScriptRam(
      script.filename
    )} GB
				_______________________`);
  }
}
