const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const isGuildMember = require("../../utils/commandsCreation/isGuildMember");
const isBotTargetingHimself = require("../../utils/commandsCreation/isBotTargetingHimself");
const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");
const userHasLowerRoleThan = require("../../utils/commandsCreation/userHasLowerRoleThan");
const sendLog = require("../../utils/sendLog");

module.exports = {
  name: "kick",

  // Description de la commande
  description: "Permet d'expulser un membre",

  // Paramètres de la commande
  options: [
    {
      name: "membre",
      description: "Permet d'expulser un membre",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "raison",
      description: "La raison de l'expulsion",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [PermissionFlagsBits.Administrator],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.ModerateMembers],

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const kickedMember = interraction.options.getUser("membre");
    const guildKickedMember = interraction.options.getMember("membre");

    if (!isGuildMember(interraction, kickedMember)) return;

    if (isBotTargetingHimself(client, interraction, kickedMember)) return;

    if (isUsingCommandOnHimself(interraction, kickedMember)) return;

    if (await userHasLowerRoleThan(interraction, guildKickedMember)) return;

    if (!guildKickedMember.kickable) {
      return interraction.reply("Cet utilisateur n'est pas expulsable");
    }

    let response;
    const kickReason =
      interraction.options.getString("raison") ?? "Aucune raison spécifiée";
    try {
      // Commande Kick
      sendLog(interraction, "Membre kick", "Red", `**${guildKickedMember}** a été kick \nReason : ${kickReason}`)
      
      await guildKickedMember.kick(kickReason);
      response = "Membre explusé avec succès";
    } catch (error) {
      console.log("Une Erreur est survenue:", error);
      response = "Erreur lors de l'expulsion du membre";
    }

    interraction.reply(response);
  },
};
