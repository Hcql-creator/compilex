const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "bouton",

  // Description de la commande
  description: "Tests boutons",

  // Paramètres de la commande
  options: [],
  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const row = new ActionRowBuilder();
    row.addComponents(
      new ButtonBuilder()
        .setCustomId("testButton")
        .setLabel("Test Bouton")
        .setEmoji("❌")
        .setStyle(ButtonStyle.Primary)
    );
    interraction.reply({ content: "test", components: [row] });
  },
};
