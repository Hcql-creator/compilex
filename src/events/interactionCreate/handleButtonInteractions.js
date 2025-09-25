const { devs, testServer } = require("../../../config.json");

module.exports = async (client, interraction) => {
  // Trouver event pour les boutons
  if (!interraction.isButton()) return;

  try {
    const customId = interraction.customId;
    const buttonHandler = buttonHandlers.find(
      (btn) => btn.customId === customId
    );

    if (!buttonHandler) return;

    if (buttonHandler.devOnly) {
      if (!devs.includes(interraction.member.id)) {
        interraction.reply({
          content:
            "👨‍💻 Seulement les développeurs sont autorisés à interragir à ce bouton.",
          ephemeral: true,
        });
        return;
      }
    }

    if (buttonHandler.testOnly) {
      if (!(interraction.guild.id === testServer)) {
        interraction.reply({
          content: "🚫 Cette interraction.",
          ephemeral: true,
        });
        return;
      }
    }

    if (buttonHandler.permissionsRequired?.length) {
      for (const permission of buttonHandler.permissionsRequired) {
        if (!interraction.member.permissions.has(permission)) {
          interraction.reply({
            content: "👮 Not enough permission",
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (buttonHandler.botPermissions?.length) {
      for (const permision of buttonHandler.botPermissions) {
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

    await buttonHandler.callback(client, interraction);
  } catch (error) {
    console.log("Error while running command:", error);
  }
};
