import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

if (!process.env.CI && existsSync(".git")) {
  execFileSync("git", ["config", "--local", "core.hooksPath", ".githooks"], {
    stdio: "inherit",
  });
}
