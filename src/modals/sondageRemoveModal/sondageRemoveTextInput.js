const { EmbedBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
  const emojiToRemove = interaction.fields.getTextInputValue("sondageRemoveTextInput").trim();

  const embed = interaction.message.embeds[0];
  const oldDescription = embed.description || "";
  const options = oldDescription.split("\n")
  // Je sais je regarde jsute d'abord ce que ca me renvoie, ici il faut qu'il reste que les icones
  // comment ca que les icpnes ??
  // tu veux aucun espace ?, par exemple dans ce qui a dans la console je veux que j'ai stv
  

  const lines = oldDescription.split("\n").map(line => line.trim()).filter(Boolean);
  const newLines = lines.filter(line => !line.startsWith(emojiToRemove));
  if (lines.length === newLines.length) {
    await interaction.reply({
      content: `Aucune option  commence par l’emoji ${emojiToRemove}`,
      ephemeral: true,
    });
    return;
  }
  
  const newDescription = newLines.join('\n\n');

  const newEmbed = EmbedBuilder.from(embed).setDescription(newDescription);
  await interaction.message.edit({ embeds: [newEmbed] });

  await interaction.reply({
    content: `✅ Option avec l’emoji **${emojiToRemove}** supprimée.`,
    ephemeral: true,
  });
};
// j'ai une idée, il est ou le contenu de la description ? sans la lligne avec l'emoji ou avec, toute la descriptio
//donc avec la ligne avec l'emoji c'est oldDescription, ok
// pk y'a des :
//c bon