module.exports = async (client, reaction, user) => {
  const messageID = "1420759078183112766";
  if (!(reaction.message.id === messageID)) return;
  if (reaction.partial) reaction = await reaction.fetch();
  const guild = reaction.message.guild;
  const guildUser = await guild.members.fetch(user.id);
  // Ajout des roles
  const roleID1 = "1420466445749325844";
  const roleID2 = "1420466496722698413";
  const roleID3 = "1420466535536791644";
  try {
    switch (reaction.emoji.name) {
      case "❌":
        guildUser.roles.add(roleID1);
        break;
      case "⚠️":
        guildUser.roles.add(roleID2);
        break;
      case "✅":
        guildUser.roles.add(roleID3);
        break;
      default:
        console.log("Réaction Inconnue");
    }
  } catch (error) {
    console.log("Une erreur est survenue:", error);
  }
};
