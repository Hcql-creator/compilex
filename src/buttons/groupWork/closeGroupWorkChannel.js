module.exports = async (client, interaction) => {
  // On récupère le salon
  const channel = interaction.channel;

  try {
    // On ferme le salon
    await channel.delete();
  } catch {
    interaction.reply({
      content: "❌ | Erreur lors de la fermeture du salon",
      ephemeral: true,
    });
  }
};
