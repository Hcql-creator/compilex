const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  // Nom de la commande
  name: "",
  
  // Description de la commande
  description: "",
  
  // Paramètres de la commande
  options: [
    {
      name: "",
      description: "",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
  
  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],
  
  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: false,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: (client, interraction) => {
    interraction.reply("");
  },
};




if (interaction.commandName === 'clear') {
    if (!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({ content: `❌ Tu n'as pas les permissions pour effacer les messages !`, ephemeral: true });
    }
    const salon = interaction.channel;

    const overwrites = salon.permissionOverwrites.cache.map(o => ({
      id: o.id,
      allow: o.allow,
      deny: o.deny,
      type: o.type
    }));

    const parentId = salon.parentId;
    const nom = salon.name;

    await salon.delete().catch(err => console.error(err));

    const newSalon = await interaction.guild.channels.create({
      name: nom,
      type: 0, // texte
      parent: parentId || null,
      permissionOverwrites: overwrites
    });

    await newSalon.send("✅ Salon vidé");
  }
