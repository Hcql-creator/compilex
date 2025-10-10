const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  console.log("icone")
  const sondageAdd1 = interaction.fields.getTextInputValue(
    "sondageAddTextInput1"
  );
  const embed = interaction.message.embeds[0];

    let nvlDescription = interaction.message.embeds[0].description +  `\n${sondageAdd1}`

  const newEmbed = EmbedBuilder.from(embed).setDescription(nvlDescription);
  await interaction.message.edit({ embeds: [newEmbed] });
  interaction.reply(
    "Icone d'option ajoutées"
  );
};