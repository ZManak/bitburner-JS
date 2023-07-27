/** @param {NS} ns */
export let icons = {
  server: "\ueba3",
  add: "&#xea60",
  sub: "&#xeaba",
  ram: "&#xeace",
  restart: "&#xea77",
  scr: "\ueac4",
  name: "\uea93",
  pc: "&#xea7a",
};
import { createSidebarItem, doc, slp, alert } from "/box/box.js";
import { colors } from "/aux/palette.js";

export async function main(ns) {
  let owned = ns.getPurchasedServers();
  const ram = [];
  for (let i = 1; i <= 17; ++i) {
    let cost = ns.getPurchasedServerCost(2 ** i);
    ram.push([2 ** i, cost]);
  }
  let item = createSidebarItem(
    "Order Servers",
    `<div class=g2><span class="icon" data=${
      icons.pc
    }>&#xea7a</span><span class=l>${
      owned.length
    } / 25</span><span class="icon" data=${
      icons.ram
    }>&#xeace</span><select id="ram" class=l>${ram
      .map(
        ([cap, cost], i) =>
          `<option value=${cap}>${ns.formatRam(cap)} / ${ns.formatNumber(
            cost
          )} $</option><`
      )
      .join("")}</select><span class=icon data=${
      icons.name
    }>&#xea93</span><input type="textarea" id="name" class=l name="name"></input><span class=icon data=${
      icons.scr
    }>&#xeac4</span><input type="textarea" id="file" class=l name="file"></input></span></br><div class="btns"><button type="button" id="order">ORDER</button><button style="color: var(--bgpri); background: var(--rep)" type="button"><b>SELL</b></button></span></div></div>`,
    "\ueba3"
  );

  function buy() {
    let name = item.querySelector("#name").value;
    let selectRam = parseInt(item.querySelector("#ram").value);
    try {
      let serv = ns.purchaseServer(name, selectRam);
      /* if (src !== undefined) {
				let threads = Math.floor((ns.getServerMaxRam(serv) / ns.getScriptRam(scr, serv)));
				ns.scp(src, serv);
				ns.exec(src, serv, threads);
			} */
      ns.tprintf(
        colors.yellow + "Bought " + serv + " / " + ns.formatRam(selectRam)
      );
    } catch (e) {
      alert(e);
    }
  }

  item.querySelector("#order").addEventListener("click", () => buy());

  /* 	item.querySelector("#sell").addEventListener("click", () => {...}) */
  while (doc.body.contains(item)) await slp(1000);
}
