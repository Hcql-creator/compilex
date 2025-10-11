const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonStyle,
  ChannelType,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const embedField = require("../../utils/embeds/embedField");
const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");
const stringMenuBuilder = require("../../utils/selectMenus/stringMenuBuilder");
const userMenuBuilder = require("../../utils/selectMenus/userMenuBuilder");

module.exports = async (client, interaction) => {
  const category = interaction.guild.channels.cache.find(
          (ch) => ch.type === ChannelType.GuildCategory && ch.name === "「 Travaux de groupe ✒️」"
        );
  const channelName = "travail-de-groupe";
  const currentChannelID = interaction.message.channelId;
  const guild = client.guilds.cache.get(interaction.guild.id);
  const parentCategory = await guild.channels.fetch(currentChannelID);
  const parentCategoryID = parentCategory.parentId;
  const channel = await interaction.guild.channels.create({
    name: channelName,
    type: 0,
    parent: category.id, 
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

  // Embed
  const groupWorkChannelEmbed = embedCreator(
    interaction,
    "#00863b",
    "Travail de groupe",
    "Description du travail inconnue",
    "https://www.teachhub.com/wp-content/uploads/2020/09/Sept-9-Benefits-of-Group-Work_web.jpg"
  );
  groupWorkChannelEmbed.addFields(
    blankEmbedField(),
    embedField("Durée prévue", "Non-Spécifiée", true),
    embedField("Deadline", "Non-Spécifiée", true),
    embedField("Participants", `<@${interaction.user.id}>`),
    blankEmbedField()
  );

  const row = new ActionRowBuilder();
  const row2 = new ActionRowBuilder();
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

  // Menu participants
  const menu = userMenuBuilder(
    "groupWorkUserSelectMenu",
    "Participants",
    1,
    10
  ).setDefaultUsers(interaction.user.id);
  row2.addComponents(menu);

  channel.send({ embeds: [groupWorkChannelEmbed], components: [row, row2] });
  interaction.reply(
    `Ton salon de travail vient tout juste d'être créer -> <#${channel.id}>`
  );
};
