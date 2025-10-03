const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  ActionRowBuilder,
  escapeHeading,
} = require("discord.js");

const isUsingCommandOnHimself = require("../../utils/commandsCreation/isUsingCommandOnHimself");
const isGuildMember = require("../../utils/commandsCreation/isGuildMember");
const userHasLowerRoleThan = require("../../utils/commandsCreation/userHasLowerRoleThan");
const isBotTargetingHimself = require("../../utils/commandsCreation/isBotTargetingHimself");
const createEmbed = require("../../utils/embeds/embedCreator");
const createButton = require("../../utils/buttonCreators/buttonCreator");
const sendLog = require("../../utils/sendLog");

module.exports = {
  name: "ban",
  description: "Bannir un membre du serveur",
  options: [
    {
      name: "utilisateur",
      description: "L'utilisateur à bannir",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "supprimer_messages",
      description: "Durée des messages à supprimer",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "Aucun", value: "0" },
        { name: "1 heure", value: "3600" },
        { name: "2 heures", value: "7200" },
        { name: "6 heures", value: "21600" },
        { name: "24 heures", value: "86400" },
        { name: "48 heures", value: "172800" },
        { name: "7 jours", value: "604800" },
        { name: "Tout", value: "all" },
      ],
    },
    {
      name: "raison",
      description: "Raison du bannissement",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],

  callback: async (client, interaction) => {

    const bannedUser = interaction.options.getUser("utilisateur");
    const reason = interaction.options.getString("raison") ?? "Aucune raison fournie";

    // Créatrion de l'embed (qui ma casser les couilles :(D  )
    const confirmEmbed = createEmbed(
      interaction,
      "Red",
      "🚫 Confirmation bannissement",
      `Voulez-vous vraiment bannir **${bannedUser.tag}** ?\nRaison : ${reason}`
    );

    // Créations des boutons (ez merci raf)
    const row = new ActionRowBuilder().addComponents(
      createButton("confirm_ban", "✅ Confirmer"),
      createButton("cancel_ban", "❌ Annuler")
    );

    await interaction.reply({
      embeds: [confirmEmbed],
      components: [row],
      ephemeral: true,
    });

    // merci chatgpt pour cette partie  
    const filter = (i) =>
      i.user.id === interaction.user.id &&
      ["confirm_ban", "cancel_ban"].includes(i.customId);

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      if (i.customId === "cancel_ban") {
        const embed = createEmbed(
          interaction,
          "Grey",
          "❌ Bannissement annulé",
          `Le bannissement de **${bannedUser.tag}** a été annulé.`
        );
        return i.update({ embeds: [embed], components: [] });
      }

      if (i.customId === "confirm_ban") {

        const guildBannedMember = interaction.options.getMember("utilisateur");
        const deleteChoice = interaction.options.getString("supprimer_messages") ?? "0";

        if (!guildBannedMember) {
          return i.update({
            content: "❌ Impossible de trouver ce membre.",
            components: [],
          });
        }

        if (!isGuildMember(interaction, bannedUser)) return;
        if (await userHasLowerRoleThan(interaction, guildBannedMember)) return;
        if (isUsingCommandOnHimself(interaction, bannedUser)) return;
        if (isBotTargetingHimself(client, interaction, bannedUser)) return;

        if (!guildBannedMember.bannable) {
          return i.update({
            content: "❌ Je ne peux pas bannir ce membre (rôle trop haut).",
            components: [],
          });
        }

        try {
          // envoyer un message au banni
          try {
            await bannedUser.send(
              `🚫 Vous avez été banni de **${interaction.guild.name}**.\nRaison : ${reason}`
            );
          } catch {
            console.log(`${bannedUser.tag} ne peut pas recevoir de DM.`);
          }

          let deleteMessageSeconds =
            deleteChoice === "all" ? 604800 : parseInt(deleteChoice, 10);

          await guildBannedMember.ban({
            reason,
            deleteMessageSeconds,
          });

          const successEmbed = createEmbed(
            interaction,
            "Green",
            "✅ Bannissement effectué",
            `${bannedUser.tag} a été banni.\n**Raison** : ${reason}\n🗑️ **Messages supprimés** : ${deleteChoice === "0"
              ? "Aucun"
              : deleteChoice === "all"
                ? "Tous (7 jours max)"
                : `${deleteMessageSeconds / 3600}h`
            }`
          );
          sendLog(interaction, "Bannissement", "Red", `**${bannedUser.tag}** a été banni \n**Raison** : ${reason}\n🗑️ **Messages supprimés** : ${deleteChoice === "0"
              ? "Aucun"
              : deleteChoice === "all"
                ? "Tous (7 jours max)"
                : `${deleteMessageSeconds / 3600}h`
            }`)
          return i.update({ embeds: [successEmbed], components: [] });
          

        } catch (error) {
          console.error("Erreur:", error);
          return i.update({
            content: "❌ Une erreur est survenue lors du bannissement.",
            components: [],
          });
        }
      }
    });

  },
};
