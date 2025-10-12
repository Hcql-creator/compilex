module.exports = async (client, reaction, user) => {
  const messageID = "1426935540296712273";
  if (!(reaction.message.id === messageID)) return;
  if (reaction.partial) reaction = await reaction.fetch();
  const guild = reaction.message.guild;
  const guildUser = await guild.members.fetch(user.id);
  // Retirer le role
  const roleS1A = "1426932123423735970";
  const roleS1B = "1426932191484444883";
  const roleS1C = "1426932253346365491";
  const roleS1D = "1426932290373812296";
  try {
    switch (reaction.emoji.name) {
      case "🅰️":
        guildUser.roles.remove(roleS1A);
        break;
      case "🅱️":
        guildUser.roles.remove(roleS1B);
        break;
      case "©":
        guildUser.roles.remove(roleS1C);
        break;
      case "🎲":
        guildUser.roles.remove(roleS1D);
      default:
        console.log("Réaction Inconnue");
    }
  } catch (error) {
    console.log("Une erreur est survenue:", error);
  }
};
