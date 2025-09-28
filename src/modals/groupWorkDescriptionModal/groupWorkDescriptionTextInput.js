const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const groupWorkDescription = interaction.fields.getTextInputValue(
    "groupWorkDescriptionTextInput"
  );
  const embed = interaction.message.embeds[0];

  const newEmbed =
    EmbedBuilder.from(embed).setDescription(groupWorkDescription);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply("Description du travail modifiée.");
};
