// Cette fonction renvoie un booléen (et une interraction.reply) si le membre passé en premier paramètre user a un role inférieur à celui passé en deuxième paramètre user
module.exports = async (interraction, executingUser, targetGuildMember) => {
  const guildExecutingUser = interraction.member;
  if (
    guildExecutingUser.roles.highest.position <
    targetGuildMember.roles.highest.position
  ) {
    interraction.reply(
      "❌ Tu ne peux pas éxécuter cette commande sur quelqu'un qui à un rôle supérieur à toi"
    );
    return true;
  }
  return false;
};
