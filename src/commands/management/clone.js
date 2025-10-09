const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const sendLog = require("../../utils/sendLog");

module.exports = {
  // Nom de la commande
  name: "clone",

  // Description de la commande
  description: "Re-créer le salon à l'identique",
  devOnly: true,

  // Paramètres de la commande
  options: [
    {
      name: "effacer",
      description: "Efface le salon d'origine",
      required: true,
      type: ApplicationCommandOptionType.Boolean,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [
    PermissionFlagsBits.ManageMessages,
    PermissionFlagsBits.ManageChannels,
  ],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interaction) => {
    const salon = interaction.channel;

    const overwrites = salon.permissionOverwrites.cache.map((o) => ({
      id: o.id,
      allow: o.allow,
      deny: o.deny,
      type: o.type,
    }));
    const parentId = salon.parentId;
    const nom = salon.name;

    const newSalon = await interaction.guild.channels.create({
      name: nom,
      type: 0,
      parent: parentId || null,
      permissionOverwrites: overwrites,
    });
    sendLog(
      interaction,
      "Salon Duppliqué",
      "Green",
      `**${nom}** a été duppliqué !`
    );
    await newSalon.send("✅ Salon crée");
    if (interaction.options.getBoolean("effacer")) {
      await salon.delete().catch((err) => console.error(err));
    }
  },
};
