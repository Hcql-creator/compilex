const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "meme",

  // Description de la commande
  description: "Produit un meme aléatoire",

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  devOnly: true,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interaction) => {
    try {
      const url = "https://meme-api.com/gimme/ProgrammerHumor";

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

      const data = await response.json();
      await interaction.reply({
        embeds: [
          {
            title: data.title,
            image: { url: data.url },
            footer: { text: `Source: ${data.subreddit}` },
          },
        ],
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du mème:", error);
      await interaction.reply(
        "❌ Impossible de récupérer un mème, réessaie plus tard !"
      );
    }
  },
};
