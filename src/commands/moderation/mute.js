// Mute le membre spécifié pour une durée indéterminée
const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const getGuildUser = require("../../utils/commandsCreation/getGuildUser");
const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");
const isBotTargetingHimself = require("../../utils/commandsCreation/isBotTargetingHimself");

module.exports = {
  name: "mute",
  description: "Mute le membre spécifié pour une durée indéterminée",

  // Paramètres de la commande
  options: [
    {
      name: "membre",
      description: "Le membre à mute",
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
    const mutedMember = interraction.options.getUser("membre");
    const guildMutedMember = await getGuildUser(interraction, mutedMember);

    if (isBotTargetingHimself(client, interraction, mutedMember)) return;
    if (isUsingCommandOnHimself(interraction, mutedMember)) return;

    // On vérifie si le role exsite
    const rolesCollection = await interraction.guild.roles.fetch();

    // Convertir la collection en array utilisable
    const roles = Array.from(rolesCollection.values());

    const mutedRoles = roles.filter((role) => role.name === "Muted");

    // Vérifier si un et un seul role "Muted" existe

    // Si plus de 1 role
    if (mutedRoles.length > 1)
      return interraction.reply(
        "🔢 Il existe plusieurs roles @Muted, merci d'en supprimer jusqu'a en laisser un seule et unique."
      );

    // Si le role Muted n'existe pas
    let mutedRole;
    if (mutedRoles.length === 0) {
      mutedRole = await interraction.guild.roles.create({
        name: "Muted",
        colors: 0x808080,
        // Afficher séparément des autres
        hoist: true,
        mentionable: false,
        permissions: [],
      });
      await guildMutedMember.roles.add(mutedRole);
    } else {
      mutedRole = mutedRoles[0];
    }
    // Sinon on lui ajoute le role
    let response = "";
    try {
      console.log("muted role name:", mutedRole.name);
      await guildMutedMember.roles.add(mutedRole);
      response = "✅ Membre mute avec succès";
    } catch (error) {
      response = "Erreur lors du mute";
    }

    interraction.reply(response);
  },
};
