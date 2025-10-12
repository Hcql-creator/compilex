module.exports = async (client, interaction) => {
  // On récupère le salon
  const channel = interaction.channel;

  try {
    // On ferme le salon
    await channel.delete();
  } catch {
    interaction.reply("❌ | Erreur lors de la fermeture du salon");
  }
};
