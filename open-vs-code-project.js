// Name: Open VS Code Project
// Description: Open a project in VS Code
// Shortcut: cmd shift .

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

edit(project);
