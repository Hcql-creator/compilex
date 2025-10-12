const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const embedField = require("../../utils/embeds/embedField");
const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
const stringMenuBuilder = require("../../utils/selectMenus/stringMenuBuilder");
const userMenuBuilder = require("../../utils/selectMenus/userMenuBuilder");

module.exports = async (client, interaction) => {
  // Le salon s'appelera par défaut "travail-de-groupe"
  const channelName = "travail-de-groupe";

  // On récupère l'ID du salon actuel
  const currentChannelID = interaction.message.channelId;

  // On récupère la catégorie parent de ce salon
  const guild = client.guilds.cache.get(interaction.guild.id);
  const parentCategory = await guild.channels.fetch(currentChannelID);

  // ID de la catégorie parent
  const parentCategoryID = parentCategory.parentId;

  // On créer un nouveau salon avec les permissions adéquates
  const channel = await interaction.guild.channels.create({
    name: channelName,
    type: 0,
    parent: parentCategoryID,
    permissionOverwrites: [
      // Permissions globale du serveur
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },

      // Permisssions pour le créateur du salon
      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ManageChannels,
          PermissionFlagsBits.ReadMessageHistory,
        ],
      },
    ],
  });

  // On créer notre embed interractif
  const groupWorkChannelEmbed = embedCreator(
    interaction,
    "#00863b",
    "Travail de groupe",
    "Description du travail inconnue",
    "https://www.teachhub.com/wp-content/uploads/2020/09/Sept-9-Benefits-of-Group-Work_web.jpg"
  );

  // Ajoute des champs
  groupWorkChannelEmbed.addFields(
    blankEmbedField(),
    embedField("Durée prévue", "Non-Spécifiée", true),
    embedField("Deadline", "Non-Spécifiée", true),
    embedField("Participants", `<@${interaction.user.id}>`),
    blankEmbedField()
  );

  // On créer 2 lignes de boutons (1 pour les boutons et une 2ème pour le dropdown)
  const row = new ActionRowBuilder();
  const row2 = new ActionRowBuilder();

  // On ajoute nos boutons à notre première ligne
  row.addComponents(
    buttonCreator("groupWorkName", "Nom du Travail", "🏷️", ButtonStyle.Primary),
    buttonCreator(
      "groupWorkDescription",
      "Description",
      "📜",
      ButtonStyle.Secondary
    ),
    buttonCreator(
      "groupWorkDuration",
      "Durée prévue",
      "⏲️",
      ButtonStyle.Secondary
    ),
    buttonCreator("groupWorkDeadline", "Deadline", "☠️", ButtonStyle.Danger),
    buttonCreator(
      "groupWorkEnded",
      "Travail Terminé",
      "🏁",
      ButtonStyle.Success
    )
  );

  // On créer notre menu déroullant
  const menu = userMenuBuilder(
    "groupWorkUserSelectMenu",
    "Participants",
    1,
    10
  ).setDefaultUsers(interaction.user.id);

  // On ajoute notre menu à la deuxième ligne de composants
  row2.addComponents(menu);

  // On envoie le message interractif dans le nouveau salon
  channel.send({ embeds: [groupWorkChannelEmbed], components: [row, row2] });

  // On confirme à l'utilisateur que son salon à été créer et on lui indique son emplacement
  interaction.reply({
    content: `Ton salon de travail vient tout juste d'être créer -> <#${channel.id}>`,
    ephemeral: true,
  });
};
