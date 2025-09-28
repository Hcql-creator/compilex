const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const getMembersFromChannel = require("../../utils/getMembersFromChannel");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
module.exports = async (client, interaction) => {
  const channel = interaction.channel;
  const rawChannelMembers = await getMembersFromChannel(client, interaction);
  const channelMembers = rawChannelMembers.filter(
    (member) => !member.permissions.has("Administrator")
  );

  const closeChannelEmbed = embedCreator(
    interaction,
    "#00FF00",
    "🏁 Travail Terminé",
    "Vous avez terminé votre travail, bravo ! \n Le salon restera en lecture seule jusqu'à sa fermeture."
  );

  const row = new ActionRowBuilder();
  row.addComponents(
    buttonCreator(
      "closeGroupWorkChannel",
      "Fermer le salon",
      "🚪",
      ButtonStyle.Danger
    )
  );
  interaction.message.edit({ embeds: [closeChannelEmbed], components: [row] });

  try {
    for (const member of channelMembers) {
      await channel.permissionOverwrites.edit(member.id, {
        SendMessages: false,
      });
    }
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: "❌ Une erreur est survenue lors du verrouillage du salon.",
      ephemeral: true,
    });
  }
};
