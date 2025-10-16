module.exports = async (client, member) => {
  const CountChannelID = "1428344498060263504";
  const channel = client.channels.cache.get(CountChannelID);
  const memberCount = member.guild.memberCount;
  const newName = `Members : ${memberCount}`;

  try {
    await channel.setName(newName);
  } catch (err) {
    console.error('Erreur en renommant le salon:', err);
  };
}
