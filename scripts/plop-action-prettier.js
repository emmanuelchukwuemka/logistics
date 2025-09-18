// scripts/plop-action-prettier.js
const { execFileSync } = require("child_process");
const path = require("path");

module.exports = function prettierAction(answers, config) {
  try {
    const prettierBin = require.resolve("prettier/bin/prettier.cjs");
    const inputs = Array.isArray(config.path) ? config.path : [config.path];

    inputs.forEach((p) => {
      const resolved = path.resolve(p);
      execFileSync(process.execPath, [prettierBin, "--write", resolved], {
        stdio: "inherit",
      });
    });

    return `Formatted with Prettier: ${inputs.join(", ")}`;
  } catch (error) {
    throw error;
  }
};
