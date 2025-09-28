const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const groupWorkName = interaction.fields.getTextInputValue(
    "groupWorkNameTextInput"
  );
  const embed = interaction.message.embeds[0];

  const newEmbed = EmbedBuilder.from(embed).setTitle(groupWorkName);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply(
    "Nom du travail modifié (vous avez les permissions pour changer le nom du salons)"
  );
};
