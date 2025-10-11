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
    console.log("1");
    const user = interaction.options.getUser("membre");
    const member = interaction.options.getMember("membre");
    const rolesCollection = await interaction.guild.roles.fetch();
    const roles = Array.from(rolesCollection.values());

    if (!member) {
      return interaction.reply({
        content: "Impossible de récupérer le membre.",
        ephemeral: true,
      });
    }

    // Récupérer les rôles warn
    const warnRoles = member.roles.cache.filter((r) =>
      r.name.toLowerCase().startsWith("warn")
    );
    console.log(
      "Roles warn trouvés :",
      warnRoles.map((r) => r.name)
    );

    // Vérifier si le membre a déjà warn2
    const hasWarn2 = warnRoles.some((r) => r.name.toLowerCase() === "warn2");
    const hasWarn1 = warnRoles.some((r) => r.name.toLowerCase() === "warn1");
    const warn1 = roles.filter((role) => role.name === "warn1");
    const warn2 = roles.filter((role) => role.name === "warn2");
    const reason = interaction.options.getString("raison");

    if (hasWarn2) {
      try {
        const MUTE_MINUTES = 33600; // ou 230 si tu veux
        await member.timeout(MUTE_MINUTES * 60 * 1000, "raison");
        sendLog(interaction, "Avertissement", "Red", `**${member}** a été avertit \nReason : ${reason}. \nC'est la troisième fois : l'utilisateur est dorénavant mute temporairement`)
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
    if (hasWarn1) {
      await member.roles.add(warn2);
      sendLog(interaction, "Avertissement", "Red", `**${member}** a été avertit \nReason : ${reason}`)
      
      return interaction.reply({
        content: `✅ ${member} a été avertit une seconde fois car ${reason}. Attention, la prochaine fois c'est un mute d'un mois !`,
        ephemeral: false,
      });
    } else {
      await member.roles.add(warn1);
      sendLog(interaction, "Avertissement", "Red", `**${member}** a été avertit \nReason : ${reason}`)
      return interaction.reply({
        content: ` ${member} a été avertit une première fois car ${reason}.`,
        ephemeral: true,
      });
    }
  },
};
