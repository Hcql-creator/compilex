module.exports = async (client, member) => {
  const CountChannelID = "1425464470377070637";
  const channel = client.channels.cache.get(CountChannelID);
  const memberCount = member.guild.memberCount;
  const newName = `Count : ${memberCount}`;

  try {
    await channel.setName(newName);
  } catch (err) {
    console.error('Erreur en renommant le salon:', err);
  };
}
