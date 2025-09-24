const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const isGuildMember = require("../../utils/commandsCreation/getGuildUser");
const userHasLowerRoleThan = require("../../utils/commandsCreation/userHasLowerRoleThan");
const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");

module.exports = {
  // Nom de la commande
  name: "tempmute",

  // Description de la commande
  description: "Mute le membre pour la durée spécifiée",

  // Paramètres de la commande
  options: [
    {
      name: "membre",
      description: "Membre à mute",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "duree",
      description: "Durée du mute",
      required: true,
      type: ApplicationCommandOptionType.Integer,
    },
    {
      name: "raison",
      description: "Raison du mute",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.ManageMessages],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    // Récupérer le membre à mute
    const guildMember = interraction.options.getMember("membre");
    if (!isGuildMember) return;

    if (isUsingCommandOnHimself(interraction, guildMember)) return;
    const rolePermissions = await userHasLowerRoleThan(
      interraction,
      interraction.user,
      guildMember
    );
    if (rolePermissions) {
      return;
    }

    // Vérifier la durée
    const duree = interraction.options.getInteger("duree");
    if (!duree || duree <= 0) {
      return interraction.reply({
        content: "❌ Tu dois indiquer une durée valide en minutes.",
        ephemeral: true,
      });
    }

    const reason =
      interraction.options.getString("raison") || "Aucune raison spécifiée";

    try {
      await guildMember.timeout(duree * 60 * 1000, reason); // timeout en ms
      return interraction.reply({
        content: `✅ ${guildMember.user.tag} a été mute pendant ${duree} minutes.\nRaison : ${reason}`,
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      return interraction.reply({
        content: "❌ Une erreur est survenue lors du mute.",
        ephemeral: true,
      });
    }
  },
};
