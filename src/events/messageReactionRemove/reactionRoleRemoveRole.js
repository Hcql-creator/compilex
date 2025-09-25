module.exports = async (client, reaction, user) => {
  if (!(reaction.message.id === "1420759078183112766")) return;
  if (reaction.partial) reaction = await reaction.fetch();
  const guild = reaction.message.guild;
  const guildUser = await guild.members.fetch(user.id);
  // Retirer le role
  const roleID1 = "1420466445749325844";
  const roleID2 = "1420466496722698413";
  const roleID3 = "1420466535536791644";
  try {
    switch (reaction.emoji.name) {
      case "❌":
        guildUser.roles.remove(roleID1);
        break;
      case "⚠️":
        guildUser.roles.remove(roleID2);
        break;
      case "✅":
        guildUser.roles.remove(roleID3);
        break;
      default:
        console.log("Réaction Inconnue");
    }
  } catch (error) {
    console.log("Une erreur est survenue:", error);
  }
};
