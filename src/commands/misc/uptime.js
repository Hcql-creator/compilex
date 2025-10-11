const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "uptime",

  // Description de la commande
  description: "aaa",

  // Paramètres de la commande
  options: [],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: true,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    const uptimeMS = client.uptime;
    const uptimeS = Math.floor(uptimeMS / 1000);
    const uptimeM = Math.floor(uptimeS / 60);
    const uptimeH = Math.floor(uptimeM / 60);
    const uptimeD = Math.floor(uptimeH / 24);
    let finalResponse;
    if (uptimeS > 0) finalResponse = `${uptimeS} secondes.`;
    if (uptimeM > 0) finalResponse = `${uptimeM} minutes.`;
    if (uptimeH > 0) finalResponse = `${uptimeH} heures.`;
    if (uptimeD > 0) finalResponse = `${uptimeD} jours.`;

    interraction.reply(`🟢 Bot en ligne depuis ${finalResponse}`);
  },
};
