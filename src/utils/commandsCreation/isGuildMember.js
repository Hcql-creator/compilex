// Cette fonction renvoie un booléen (et une interraction.reply)  si le membre passé en paramètre n'appartient pas au serveur sur lequel à été éxécuté la commande
module.exports = async (interration, targetMember) => {
  const guildTargetMember = interration.member;

  if (!guildTargetMember) {
    interration.reply("❌ Le membre sélectionné ne fais pas parti du serveur");
    return true;
  }
  return false;
};
