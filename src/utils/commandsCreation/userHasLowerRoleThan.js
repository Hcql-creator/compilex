const getGuildUser = require("./getGuildUser");

// Cette fonction renvoie un booléen (et une interraction.reply) si le membre passé en premier paramètre user a un role inférieur à celui passé en deuxième paramètre user
module.exports = async (interraction, executingUser, targetUser) => {
  const guildExecutingUser = await getGuildUser(interraction, executingUser);

  const guildTargetUser = await getGuildUser(interraction, targetUser);
  console.log("Fonction comparation de roles");
  if (
    guildExecutingUser.roles.highest.position <
    guildTargetUser.roles.highest.position
  ) {
    interraction.reply(
      "❌ Tu ne peux pas éxécuter cette commande sur quelqu'un qui à un rôle supérieur à toi"
    );
    return true;
  }
  console.log("Test passed");
  return false;
};
