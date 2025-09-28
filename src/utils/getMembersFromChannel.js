module.exports = async (client, interaction) => {
  // fetch all members
  const guildID = interaction.guild.id;
  const guild = await client.guilds.fetch(guildID);
  const guildMembersCollection = await guild.members.fetch();
  const guildMembers = Array.from(guildMembersCollection.values());

  const visibleMembers = guildMembers.filter((member) =>
    member.permissionsIn(interaction.channel).has("ViewChannel")
  );

  return visibleMembers;
};
