module.exports = {
  name: "ping",

  // Description de la commande
  description: "Répond pong avec la latence en ms.",

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    await interraction.deferReply();

    const reply = await interraction.fetchReply();
    const ping = reply.createdTimestamp - interraction.createdTimestamp;
    interraction.editReply(`Pong ! Répondu en ${ping}ms`);
  },
};
