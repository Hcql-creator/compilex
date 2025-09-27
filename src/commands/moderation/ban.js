const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,
  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");
const isGuildMember = require("../../utils/commandsCreation/isGuildMember");
const userHasLowerRoleThan = require("../../utils/commandsCreation/userHasLowerRoleThan");
const isBotTargetingHimself = require("../../utils/commandsCreation/isBotTargetingHimself");
const getGuildUser = require("../../utils/commandsCreation/getGuildUser");

module.exports = {
  // Nom de la commande
  name: "ban",

  // Description de la commande
  description: "Banni un membre",

  // Paramètres de la commande
  options: [
    {
      name: "utilisateur",
      description: "L'utilisateur a bannir",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "raison",
      description: "Raison du banissement",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],

  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interraction) => {
    const bannedMember = interraction.options.getUser("utilisateur");
    const reason =
      interraction.options.getString("raison") ?? "Aucun raison fournie";

    const guildBannedMember = await getGuildUser(interraction, bannedMember);

    if (isGuildMember(interraction, bannedMember)) return;

    if (userHasLowerRoleThan(interraction, interraction.user, bannedMember))
      return;

    if (isUsingCommandOnHimself(interraction, bannedMember)) return;

    if (isBotTargetingHimself(client, interraction, bannedMember)) return;

    if (!guildBannedMember.bannable) {
      return interraction.reply("Cet utilisateur n'est pas bannisable");
    }

    try {
      await guildBannedMember.ban({ reason });
      interraction.reply("Membre banni");
    } catch (error) {
      interraction.reply("Erreur lors du bannisement");
      console.log("Erreur:", error);
    }
  },
};
