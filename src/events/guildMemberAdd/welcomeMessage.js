module.exports = (client, member) => {
  const channel = client.channels.cache.get("1420413832114864249");
  channel.send(`Bienvenu <@${member.user.id}>`);
};
