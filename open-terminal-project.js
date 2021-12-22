// Name: Open Terminal Project
// Description: Open a project in Terminal
// Shortcut: cmd shift ,

import "@johnlindquist/kit";

const projectDirPath = "~/Workspace";
const ignoredProjects = ["script-kits"];

const projects = ls(projectDirPath)
  .filter((dir) => !ignoredProjects.includes(dir))
  .map((dir) => {
    const fullPath = path.join(projectDirPath, dir);
    return {
      name: dir,
      value: fullPath,
      description: fullPath,
    };
  });

const project = await arg("Select project:", projects);
const script = JSON.stringify(`cd ${project}`);

await exec(`osascript -e '
  tell application "Terminal"
    if it is running then
      activate
      do script ${script}
    else
      activate
      do script ${script} in window 1
    end if
  end tell
'`);
