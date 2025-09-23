// Cette fonction renvoie un booléen (et une interraction.reply)  si le membre applique une commande sur lui même
module.exports = (interraction, targetUser) => {
  if (interraction.user.id === targetUser.id) {
    interraction.reply(
      "🚫 Tu ne peux pas utiliser cette commande sur toi même."
    );
    return true;
  }
  return false;
};
