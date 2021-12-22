// Menu: Meet
// Description: Start new meet and paste on Slack
// Author: Valentin Hervieu
// Twitter: @ValentinHervieu

import "@johnlindquist/kit";

async function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

browse("https://meet.new");
let count = 1;
let tab = "";

while (count < 20) {
  await sleep(500);
  tab = await getActiveTab();
  if (!tab.startsWith("https://meet.google.com/new")) break;
  count += 1;
}

tab = tab.split("?")[0];

await copy(tab);
await focusWindow("Slack", "");
await setSelectedText(tab);
