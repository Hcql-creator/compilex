const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  MessageFlags,
} = require("discord.js");
const sendLog = require("../../utils/sendLog");

module.exports = {
  name: "warn",
  description: "Donner un avertissement à un membre",
  options: [
    {
      name: "membre",
      description: "Le membre à avertir",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "raison",
      description: "La raison de l'avertissement",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageMessages],
  botPermissions: [
    PermissionFlagsBits.ManageRoles,
    PermissionFlagsBits.ModerateMembers,
  ],

  callback: async (client, interaction) => {
    // On récupère le membre à warn
    const member = interaction.options.getMember("membre");

    // On récupère les roles du serveur
    const rolesCollection = await interaction.guild.roles.fetch();
    const roles = Array.from(rolesCollection.values());

    // On vérifie que le membre fourni est conforme à l'éxécution de la commande
    if (!member) {
      return interaction.reply({
        content: "Impossible de récupérer le membre.",
        ephemeral: true,
      });
    }

    // On récupère les rôles warn
    const warnRoles = member.roles.cache.filter((r) =>
      r.name.toLowerCase().startsWith("warn")
    );

    // Vérifier si le membre a déjà warn2
    const hasWarn2 = warnRoles.some((r) => r.name.toLowerCase() === "warn2");
    const hasWarn1 = warnRoles.some((r) => r.name.toLowerCase() === "warn1");

    // On récupère les roles warn du serveur
    const warn1 = roles.filter((role) => role.name === "warn1");
    const warn2 = roles.filter((role) => role.name === "warn2");

    // O récupère la raison du warn
    const reason = interaction.options.getString("raison");

    // Sanction si l'utilisateur à déjà été warn 2 fois
    if (hasWarn2) {
      try {
        const MUTE_MINUTES = 33600; // ou 230 si tu veux
        await member.timeout(MUTE_MINUTES * 60 * 1000, "raison");

        // On log l'action dans le salon adéquat
        sendLog(
          interaction,
          "Avertissement",
          "Red",
          `**${member}** a été avertit (**WARN**) \nReason : ${reason}. \nC'est la troisième fois : l'utilisateur est dorénavant mute temporairement`
        );

        return interaction.reply({
          content: `✅ ${member.user.tag} a été mute ${MUTE_MINUTES} minutes (3ème avertissement).`,
          ephemeral: false,
        });
      } catch (error) {
        console.error(error);
        return interaction.reply({
          content: "❌ Une erreur est survenue lors du warn.",
          ephemeral: true,
        });
      }
    }

    // On ajoute le role warn2 si l'utilisateur à déjà été avertit une fois
    if (hasWarn1) {
      await member.roles.add(warn2);

      // On log l'action dans le salon adéquat
      sendLog(
        interaction,
        "Avertissement",
        "Red",
        `**${member}** a été avertit (**WARN**) \nReason : ${reason}`
      );

      return interaction.reply({
        content: `✅ ${member} a été avertit une seconde fois car ${reason}. Attention, la prochaine fois c'est un mute d'un mois !`,
        ephemeral: false,
      });
    } else {
      // Si l'utilisateur n'a jamais été avertit alros on lui ajoute le role warn1
      await member.roles.add(warn1);

      // On log l'action dans le salon adéquat
      sendLog(
        interaction,
        "Avertissement",
        "Red",
        `**${member}** a été avertit \nReason : ${reason}`
      );
      return interaction.reply({
        content: ` ${member} a été avertit une première fois car ${reason}.`,
        ephemeral: true,
      });
    }
  },
};
