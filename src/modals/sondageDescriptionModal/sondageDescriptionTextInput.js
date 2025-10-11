const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const sondageDescription = interaction.fields.getTextInputValue(
    "sondageDescriptionTextInput"
  );
  const embed = interaction.message.embeds[0];

  const newEmbed =
    EmbedBuilder.from(embed).setDescription(sondageDescription);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply("Description du travail modifiée.");
};
