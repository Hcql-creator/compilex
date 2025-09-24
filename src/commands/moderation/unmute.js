const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const getGuildUser = require("../../utils/commandsCreation/getGuildUser")

module.exports = {
  // Nom de la commande
  name: "unmute",
  
  // Description de la commande
  description: "    Désactive la sanction mute",
  
  // Paramètres de la commande
  options: [
    {
      name: "membre",
      description: "Le membre banni",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
  
  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  
  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    // on récupère le role mute
    const rolesCollection = await interraction.guild.roles.fetch();
    const roles = Array.from(rolesCollection.values());
    const mutedRoles = roles.filter((role) => role.name === "Muted");

    //on récupère le membre banni
    const mutedMember = interraction.options.getUser("membre");
    const guildMutedMember = await getGuildUser(interraction, mutedMember);

    // si il a le role on enleve
    try {if (guildMutedMember.roles.cache.has(mutedRoles[0].id)){
      await guildMutedMember.roles.remove(mutedRoles[0])
    }} catch {
      console.log("Un problème est survenu")
    }
    // si il est mute temp on arrete
    try{ 
      await guildMutedMember.timeout(null, 'Annulation du mute avant la fin')
    } catch(error){
      console.error(error)
    }

      return interraction.reply("Membre unmute avec succès")
  },
};
