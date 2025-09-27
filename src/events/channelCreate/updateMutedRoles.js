module.exports = async (client, channel) => {
  const roleCollection = await channel.guild.roles.fetch();
  const roles = Array.from(roleCollection.values());
  const mutedRoles = roles.filter((role) => role.name === "Muted");

  // Si plus de 1 role
  if (mutedRoles.length > 1)
    return channel.send(
      "🔢 Il existe plusieurs roles @Muted, merci d'en supprimer jusqu'a en laisser un seule et unique."
    );

  // Si le role Muted n'existe pas
  let mutedRole;
  if (mutedRoles.length === 0) {
    mutedRole = await channel.guild.roles.create({
      name: "Muted",
      colors: 0x808080,
      // Afficher séparément des autres
      hoist: true,
      mentionable: false,
      permissions: [],
    });
  } else {
    mutedRole = mutedRoles[0];
  }

  let response;
  try {
    await channel.permissionOverwrites.edit(mutedRole, {
      SendMessages: false,
      ViewChannel: true,
    });
  } catch (error) {
    response = "Erreur lors de la modification des permissioons";
  }

  if (response) {
    channel.send(response);
  }
};
