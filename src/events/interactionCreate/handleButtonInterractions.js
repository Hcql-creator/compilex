const path = require("path");
const getAllFiles = require("../../utils/getAllFiles");

module.exports = (client, interaction) => {
  if (!interaction.isButton()) return;

  // Get all button files
  const buttonFiles = getAllFiles(path.join(__dirname, "../..", "buttons"));
  let buttonActionFile;
  for (const buttonFile of buttonFiles) {
    const fileName = buttonFile
      .toString()
      .replace(/\\/g, "/")
      .split("/")
      .pop()
      .split(".")[0];
    if (fileName === interaction.customId) buttonActionFile = fileName;
  }

  // On éxécute le code du fichier correspondant
  if (buttonActionFile) {
    const filePath = path.join(
      __dirname,
      "../..",
      "buttons",
      `${buttonActionFile}.js`
    );
    const button = require(filePath);
    button(client, interaction);
  }
};
