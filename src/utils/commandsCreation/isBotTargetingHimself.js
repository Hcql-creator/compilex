// Cette fonction renvoie un booléen (et une interraction.reply)  si la commande est éxécutée sur le bot lui même
module.exports = (client, interraction, targetUser) => {
  if (client.user.id === targetUser.id) {
    interraction.reply(
      "❌ Tu ne peux pas éxécuté cette commande sur le bot lui même"
    );
    return true;
  }
  return false;
};
