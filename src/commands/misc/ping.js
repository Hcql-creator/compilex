module.exports = {
  name: "ping",

  // Description de la commande
  description: "Répond pong avec la latence en ms.",
  devOnly: true,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    // On laisse le bot réfléchir le temps du calcul
    await interraction.deferReply();

    const reply = await interraction.fetchReply();
    const ping = reply.createdTimestamp - interraction.createdTimestamp;
    interraction.editReply(`Pong ! Réponse en ${ping}ms`);
  },
};
