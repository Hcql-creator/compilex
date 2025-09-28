const { EmbedBuilder } = require("discord.js");
const getMembersFromChannel = require("../../utils/getMembersFromChannel");

module.exports = async (client, interaction) => {
  await interaction.deferReply();
  const usersAccessingChannel = await getMembersFromChannel(
    client,
    interaction
  );
  const filteredUsersAccessingChannel = usersAccessingChannel
    .filter((user) => !user.user.bot)
    .map((user) => user.user.id);
  console.log(filteredUsersAccessingChannel);

  const userAllowedInChannelCollection = interaction.users;
  const userAllowedInChannel = Array.from(
    userAllowedInChannelCollection.values()
  ).map((user) => user.id);
  console.log(userAllowedInChannel);

  const embed = interaction.message.embeds[0];
  const newEmbed = EmbedBuilder.from(embed);
  let userList = "";
  for (const user of userAllowedInChannel) {
    userList += `<@${user}>\n`;
  }
  const updatedEmbedFields = newEmbed.data.fields.map((field) => {
    if (field.name === "Participants") {
      return {
        ...field,
        value: userList,
      };
    }
    return field;
  });
  newEmbed.setFields(updatedEmbedFields);

  // Ajout / retrait des permissions
  try {
    // On retire les utilisateurs indésirables
    for (const user of usersAccessingChannel) {
      if (!userAllowedInChannel.includes(user)) {
        await interaction.channel.permissionOverwrites.edit(user, {
          SendMessages: false,
          ViewChannel: false,
        });
      }
    }

    // On ajoute les utilisateurs manquants
    for (const user of userAllowedInChannel) {
      if (!usersAccessingChannel.includes(user)) {
        await interaction.channel.permissionOverwrites.edit(user, {
          SendMessages: true,
          ViewChannel: true,
        });
      }
    }
    await interaction.message.edit({ embeds: [newEmbed] });
    await interaction.editReply(
      "Liste des utilisateurs accédant au salon mise à jour !"
    );
  } catch (error) {
    console.log("Erreur lors de la modification des permission", error);
  }
};
