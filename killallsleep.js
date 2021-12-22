// Name: Quit All and Sleep
// Description: Closes (Cmd+Q) all open apps and go to sleep
// Author: Franck Boucher
// Twitter: @Franck_Boucher
// Shortcut: command option control l

import "@johnlindquist/kit";
await quitAllApps('"Finder"');
await sleep();
