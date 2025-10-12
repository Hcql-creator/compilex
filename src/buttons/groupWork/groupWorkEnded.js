const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const getMembersFromChannel = require("../../utils/getMembersFromChannel");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
module.exports = async (client, interaction) => {
  // On récupère le salon actuel
  const channel = interaction.channel;

  // On récupère tous les membres ayant accès au salon
  const rawChannelMembers = await getMembersFromChannel(client, interaction);

  // On filtre cette liste pour garder uniquement les non-admins (car les permissions changées ne les impactent pas)
  const channelMembers = rawChannelMembers.filter(
    (member) => !member.permissions.has("Administrator")
  );

  // On créer le nouvel embed
  const closeChannelEmbed = embedCreator(
    interaction,
    "#00FF00",
    "🏁 Travail Terminé",
    "Vous avez terminé votre travail, bravo ! \n Le salon restera en lecture seule jusqu'à sa fermeture."
  );

  // On créer une ligne de composants
  const row = new ActionRowBuilder();

  // On ajoute un bouton pour Vérouiller le salon à notre ligne de composants
  row.addComponents(
    buttonCreator(
      "closeGroupWorkChannel",
      "Fermer le salon",
      "🚪",
      ButtonStyle.Danger
    )
  );

  // On modifie notre message pour afficher notre embed ainsi que notre bouton
  interaction.message.edit({ embeds: [closeChannelEmbed], components: [row] });

  try {
    // Pour chacun des membres de notre liste filtrée
    for (const member of channelMembers) {
      // On lui enlève la permission d'envoyer des messages
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
