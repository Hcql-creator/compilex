const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];
  const files = readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(directory, file.name);

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};
