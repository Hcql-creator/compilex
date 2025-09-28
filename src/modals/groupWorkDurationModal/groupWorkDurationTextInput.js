const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const groupWorkDuration = interaction.fields.getTextInputValue(
    "groupWorkDurationTextInput"
  );
  const embed = interaction.message.embeds[0];
  const newEmbed = EmbedBuilder.from(embed);
  const updatedEmbedFields = newEmbed.data.fields.map((field) => {
    if (field.name === "Durée prévue") {
      return { ...field, value: groupWorkDuration };
    }
    return field;
  });
  newEmbed.setFields(updatedEmbedFields);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply("Durée estimée du travail modifiée.");
};
