const { PermissionFlagsBits } = require("discord.js");

module.exports = async (client, oldState, newState) => {
  const createCustomVoiceChannelID = "1422637363963760860";
  const channelParentID = "1421419168074563684";
  if (
    (!oldState.channelId && newState.channelId) ||
    (oldState.channelId && newState.channelId)
  ) {
    const guild = await client.guilds.fetch(newState.guild.id);
    const user = await guild.members.fetch(newState.id);
    // On vérfie si c'est le bon salon
    if (newState.channelId === createCustomVoiceChannelID) {
      const channel = await newState.guild.channels.create({
        name: `Salon de ${
          user.user.globalName ?? user.user.username ?? user.user.tag
        }`,
        type: 2,
        parent: channelParentID,
        permissionOverwrites: [
          // Permissions globale du serveur
          {
            id: newState.guild.id,
          },

          // Permisssions pour le créateur du ticket
          {
            id: newState.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageChannels,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
        ],
      });

      // Move user to new channel
      user.voice.setChannel(channel.id);

      channel.send(
        `<@${user.user.id}> | Voice channel crée, tu as les permissions pour modifier ses paramètres`
      );
    }
  }
};
