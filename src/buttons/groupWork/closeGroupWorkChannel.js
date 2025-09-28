module.exports = async (client, interaction) => {
  const channel = interaction.channel;
  try {
    await channel.delete();
  } catch {
    interaction.reply("Ca pas marché t'es con ou quoi - bg");
  }
};
