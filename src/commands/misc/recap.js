const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const geminiRequest = require("../../utils/AI/geminiRequest");

module.exports = {
  // Nom de la commande
  name: "recap",

  // Description de la commande
  description:
    "Résumé de la conversation, vous pouvez aussi poser vos questions",
  devOnly: true,

  // Paramètres de la commande
  options: [
    {
      name: "nombre_messages",
      description: "Nombre de messages à résumer (10 - 100)",
      required: false,
      type: ApplicationCommandOptionType.Integer,
    },
    {
      name: "question",
      description: "Une question que vous avez sur la discussion",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: true,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: true,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    await interraction.deferReply();
    const messageNumberOption =
      interraction.options.getInteger("nombre_messages");
    const question = interraction.options.getString("question");
    const messageNumber = messageNumberOption ?? 100;
    if (messageNumber < 10 || messageNumber > 100)
      return interraction.reply("Nombre de message invalide (10 - 100)");

    const channelID = interraction.channel.id;
    const channel = client.channels.cache.get(channelID);
    // Récupérer les messages
    let messageArray = [];
    let geminiResponse;
    channel.messages.fetch({ limit: messageNumber }).then(async (messages) => {
      console.log("Fetched", messages.size, "messages.");
      messages.forEach((message) => {
        messageArray.push({
          authorName: message.author.globalName ?? message.author.tag,
          authorID: message.author.id,
          content: message.content,
        });
      });
      messageArray.reverse();
      const stringOutput = messageArray
        .map((msg) => `${msg.authorName} (${msg.authorID}): ${msg.content}`)
        .join("\n");
      geminiResponse = await geminiRequest(stringOutput, question, true);
      interraction.editReply(geminiResponse);
    });
  },
};
