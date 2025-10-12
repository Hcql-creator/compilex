const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const sondageName = interaction.fields.getTextInputValue(
    "sondageNameTextInput"
  );
  const embed = interaction.message.embeds[0];

  const newEmbed = EmbedBuilder.from(embed).setTitle(sondageName);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply(
    "Nom du travail modifié (vous avez les permissions pour changer le nom du salons)"
  );
};
