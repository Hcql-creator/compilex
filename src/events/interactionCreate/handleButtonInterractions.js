const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");

module.exports = (client, interaction) => {
  if (!interaction.isButton()) return;
  const [baseID, ...args] = interaction.customId.split("|");

  // Get all button files
  const buttonFolders = getAllFiles(
    path.join(__dirname, "../..", "buttons"),
    true
  );

  let buttonActionFolder;
  let buttonActionFile;
  for (const folder of buttonFolders) {
    const folderFiles = getAllFiles(folder);
    for (const file of folderFiles) {
      const fileName = file
        .toString()
        .replace(/\\/g, "/")
        .split("/")
        .pop()
        .split(".")[0];
      if (fileName === baseID) {
        buttonActionFolder = folder.replace(/\\/g, "/").split("/").pop();
        buttonActionFile = fileName;
      }
    }
  }

  // On éxécute le code du fichier correspondant
  if (buttonActionFile) {
    const filePath = path.join(
      __dirname,
      "../..",
      `buttons/${buttonActionFolder}`,
      `${buttonActionFile}.js`
    );
    const button = require(filePath);
    button(client, interaction, args);
  }
};
