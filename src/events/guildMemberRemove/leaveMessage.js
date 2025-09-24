module.exports = (client, member) => {
  console.log("left");
  const channel = client.channels.cache.get("1420420126703882362");
  channel.send(`<@${member.user.id}> à quitter le serveur`);
};
