module.exports = (client, member) => {
  const welcomeChannelID = "1421414936118165587";
  const channel = client.channels.cache.get(welcomeChannelID);
  channel.send(`Bienvenu <@${member.user.id}>`);
    };
