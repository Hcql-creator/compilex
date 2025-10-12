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
    // On récupère le salon ou l'interaction à eu lieu
    const salon = interaction.channel;

    // On copie les permissions du salon actuel
    const overwrites = salon.permissionOverwrites.cache.map((o) => ({
      id: o.id,
      allow: o.allow,
      deny: o.deny,
      type: o.type,
    }));

    // On récupère la catégorie du salon parent
    const parentId = salon.parentId;

    // On récupère le nom du salon
    const nom = salon.name;

    // On créer notre nouveau salon avec les mêmes permissions
    const newSalon = await interaction.guild.channels.create({
      name: nom,
      type: 0,
      parent: parentId || null,
      permissionOverwrites: overwrites,
    });

    // On envoie un log récapitulatif de l'action
    sendLog(
      interaction,
      "Salon Duppliqué",
      "Green",
      `**${nom}** a été duppliqué !`
    );

    // Informe l'utilisateur du succès de la commande
    await newSalon.send("✅ Salon Cloné");

    // Si l'utilisateur souhaite supprimer le salon initial
    if (interaction.options.getBoolean("effacer")) {
      // On supprime le salon initial
      await salon.delete().catch((err) => console.error(err));
    }
    else{
      salon.send("✅ Clonnage terminé")
    }
    },
  
};
