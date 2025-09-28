const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");

module.exports = (client, interaction) => {
  if (!interaction.isUserSelectMenu()) return;

  // Get all dropdown Folders
  const dropdownFolders = getAllFiles(
    path.join(__dirname, "../..", "dropdowns"),
    true
  );
  // On cherche la folder correspondant au menu de l'interaction
  let actionFolder;
  for (const folder of dropdownFolders) {
    const folderName = folder.replace(/\\/g, "/").split("/").pop();
    if (folderName === interaction.customId) actionFolder = folder;
  }

  // On cherche le fichier dans cette folder pour éxécuter l'interaction correspondante
  let actionFile = actionFolder.replace(/\\/g, "/").split("/").pop();

  // On éxécute le code du fichier correspondant
  if (actionFile) {
    const folderName = actionFolder.replace(/\\/g, "/").split("/").pop();
    const filePath = path.join(
      __dirname,
      "../..",
      `dropdowns/${folderName}`,
      `${actionFile}.js`
    );
    const dropdownItem = require(filePath);
    dropdownItem(client, interaction);
  }
};
