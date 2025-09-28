const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");

module.exports = (client, interaction) => {
  if (!interaction.isModalSubmit()) return;

  // Get all modal Folders
  const modalFolders = getAllFiles(
    path.join(__dirname, "../..", "modals"),
    true
  );
  // On cherche la folder correspondant au menu de l'interaction
  let actionFolder;
  for (const folder of modalFolders) {
    const folderName = folder.replace(/\\/g, "/").split("/").pop();
    if (folderName === interaction.customId) actionFolder = folder;
  }

  // On cherche le fichier dans cette folder pour éxécuter l'interaction correspondante
  const actionFolderFiles = getAllFiles(actionFolder, false);
  let actionFile;
  const interactionFieldsCollection = interaction.fields.fields;
  const interactionFields = Array.from(interactionFieldsCollection.values());
  let modalItemIndex = 0;
  for (const modalItem of actionFolderFiles) {
    const fileName = modalItem
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      .split(".")[0];
    if (fileName === interactionFields[0].customId) actionFile = fileName;
    modalItemIndex += 1;
  }
  // On éxécute le code du fichier correspondant
  if (actionFile) {
    const folderName = actionFolder.replace(/\\/g, "/").split("/").pop();
    const filePath = path.join(
      __dirname,
      "../..",
      `modals/${folderName}`,
      `${actionFile}.js`
    );
    const modalItem = require(filePath);
    modalItem(client, interaction);
  }
};
