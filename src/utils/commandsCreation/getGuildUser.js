// Cette fonction retourne le GuildUser à partir d'un user passé en paramètre
module.exports = async (interraction, user) => {
  const guildUser = await interraction.guild.members.fetch(user.id);
  return guildUser;
};
