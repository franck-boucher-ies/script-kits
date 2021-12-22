/** @type {import("@johnlindquist/kit")} */
// Exclude:

$.verbose = false;

const TOKENS_TO_REMOVE = ["* ", "origin/", "HEAD -> "];

// Utility to process ZX output by converting lines into an array and removing
// some tokens from the branch names (so remote branches and local branches have
// the same name)
const processOutput = (output) => [
  ...new Set(
    output
      .split("\n")
      .map((branch) => {
        let res = branch.trim();
        TOKENS_TO_REMOVE.forEach((token) => (res = res.replaceAll(token, "")));
        return res;
      })
      .filter((branch) => branch.length > 0)
  ),
];

// Fetching all from remote
await $`git fetch --all`;

// Pruning all branches
await $`git fetch -p`;

// Retrieve remote and local branches
console.log("Parsing remote and local branches...");
const remoteBranches = await $`git branch -r`.then((output) =>
  processOutput(output.stdout)
);
const localBranches = await $`git branch`.then((output) =>
  processOutput(output.stdout)
);

// Compute the set of branches that are not used
const branchesToRemove = localBranches.filter(
  (branch) => !remoteBranches.includes(branch)
);

// No branches to remove, nothing to do !
if (branchesToRemove.length === 0) {
  console.log("No branches to remove. All good 👌");
  exit();
}

// Output the list of branches to remove
console.log(
  `Found ${branchesToRemove.length} branches that only exist locally:`
);
branchesToRemove.map((branch) => console.log(`  - ${branch}`));
console.log();

// Ask the user to confirm the list of branches to remove
const choice = await arg({
  placeholder:
    "Do you wish to delete all thoses branches, or select some manually ?",
  hint: "[a]ll/[s]elect",
});
if (choice === "a") {
  // Removing all branches at once
  console.log("Deleting all branches...");
  for (const branch in branchesToRemove) {
    await $`git branch -D ${branchesToRemove[branch]}`;
  }
  console.log("✅ Done.");
} else if (choice === "s") {
  // Ask the user to select branches to remove
  for (const branch in branchesToRemove) {
    const branchName = branchesToRemove[branch];
    const answer = await arg({
      placeholder: `Delete ${branchName}?`,
      hint: `[y]es/[n]o/[e]xit`,
    });
    if (answer === "y") {
      try {
        await $`git branch -D ${branchName}`;
        console.log(`✅ Branch ${branchName} successfully deleted locally.`);
      } catch (err) {
        console.error(
          `❌ Something went wrong while deleting your branch ${branchName}.`
        );
      }
    } else if (answer === "e") {
      console.log("Exiting...");
      break;
    }
  }
}

console.log("All done, bye 👋");
