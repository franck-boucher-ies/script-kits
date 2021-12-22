// Name: Portail-RH
// Description: Start the Portail-RH project and open it in VS Code
// Author: Franck Boucher
// Twitter: @Franck_Boucher

import "@johnlindquist/kit";

/* Project structure:
project
  |-- back-end
  |-- front-end
*/

const projectPath = "~/Workspace/hr-planning";

async function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const script = (end) =>
  JSON.stringify(`cd ${projectPath} && cd ${end} && yarn start`);

const backendScript = script("back-end");
const frontendScript = script("front-end");

// if it is running 'activate' focus the app and 'do script' creates a new window
// if it is not running 'activate' create a new window and we must 'do script' in that window
await exec(`osascript -e '
  tell application "Terminal"
    if it is running then
      activate
      do script ${backendScript}
    else
      activate
      do script ${backendScript} in window 1
    end if
  end tell
'`);

// open a new tab and 'do script' in the same window
await exec(
  `osascript -e 'tell application \"System Events\" to keystroke \"t\" using command down'`
);
await exec(
  `osascript -e 'tell application "Terminal" to do script ${frontendScript} in window 1'`
);

edit(projectPath);
