import { readdirSync } from "fs";
import { join } from "path";

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(directory, file);
  }
};
