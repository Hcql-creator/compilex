const { devs, testServer } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interraction) => {
  // Trouver event pour les boutons
  if (!interraction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interraction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interraction.member.id)) {
        interraction.reply({
          content: "👨‍💻 Only developpers are allowed to run this command.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interraction.guild.id === testServer)) {
        interraction.reply({
          content:
            "🚫 Cette commande ne peut pas etre exécutée dans ce serveur.",
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interraction.member.permissions.has(permission)) {
          interraction.reply({
            content: "👮 Not enough permission",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permision of commandObject.botPermissions) {
        const bot = interraction.guild.members.me;

        if (!bot.permissions.has(permision)) {
          interraction.reply({
            content: "🚫 Le bot n'a pas assez de permissions",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interraction);
  } catch (error) {
    console.log("Error while running command:", error);
  }
};
