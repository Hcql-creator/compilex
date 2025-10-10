const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const sondageAdd = interaction.fields.getTextInputValue(
    "sondageAddTextInput"
  );
  const embed = interaction.message.embeds[0];
  let nvlDescription = interaction.message.embeds[0].description +  ` : \n${sondageAdd}`
  const newEmbed = EmbedBuilder.from(embed).setDescription(nvlDescription);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply(
    "Option ajoutées"
  );
};
