module.exports = async (client, oldState, newState) => {
  // Channels a ne pas supprimer
  const authorizedChannels = ["1422637363963760860", "1422653727512461493"];

  // Si l'user quite
  if (
    (oldState.channelId && !newState.channelId) ||
    (oldState.channelId && newState.channelId)
  ) {
    // Si il reste personnne dans le salon
    const guild = await client.guilds.fetch(oldState.guild.id);
    const channel = await guild.channels.fetch(oldState.channelId);

    // Et que le salon peut etre supprimé
    if (
      channel.members.size === 0 &&
      !authorizedChannels.includes(oldState.channelId)
    ) {
      try {
        await channel.delete();
      } catch (error) {
        console.error("Erreur lors de la suppression du salon");
      }
    }
  }
};
