// Mute le membre spécifié pour une durée indéterminée
const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");
const isBotTargetingHimself = require("../../utils/commandsCreation/isBotTargetingHimself");
const sendLog = require("../../utils/sendLog");

module.exports = {
  name: "mute",
  description: "Mute le membre spécifié pour une durée indéterminée",

  // Paramètres de la commande
  options: [
    {
      name: "membre",
      description: "Le membre à mute",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "raison",
      description: "La raison du mute",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageMessages],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const mutedMember = interraction.options.getUser("membre");
    const guildMutedMember = interraction.options.getMember("membre");
    const raisonMute = interraction.options.getString("raison");

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
    mutedRole = mutedRoles[0];
    let response = "";
    try {
      // On donne le role a l'utilisateur
      await guildMutedMember.roles.add(mutedRole);
      response = `✅ Membre mute avec succès /nRaison : ${raisonMute}`;
    } catch (error) {
      response = "Erreur lors du mute";
    }
    // On défini les permissions pour tous les salons du role Muted
    const channelCollections = await interraction.guild.channels.fetch();
    const channels = Array.from(channelCollections.values());
    for (const channel of channels) {
      channel.permissionOverwrites.edit(mutedRole, {
        SendMessages: false,
        ViewChannel: true,
      });
    }

    // On log l'action dans le salon dédié
    sendLog(
      interraction,
      "Mute",
      "Orange",
      `Le membre **${guildMutedMember} a été mute \nReason : **${raisonMute}`
    );

    interraction.reply(response);
  },
};
