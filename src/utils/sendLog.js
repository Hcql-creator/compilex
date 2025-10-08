const createEmbed = require("../utils/embeds/embedCreator");

// Fonction réutilisable
module.exports = async (interaction, title, color, embedContent = '') => {
    const channelID = "1422852024281862155"; 
    const guild = interaction.guild;
    let logChannel = guild.channels.cache.get(channelID);
    let user;
    if (interaction.user) {
      user = interaction.user.tag
    } else {
      user = interaction.author.tag
    }

    const commandName = interaction.commandName;
   
    //embed
    const embed = createEmbed(
      interaction,
        color,
        title,
        `La commande **${commandName}** a été réalisée\n${embedContent}`,
    );
    
    await logChannel.send({ embeds: [embed] });
    console.log(`✅ Log envoyé : ${user} a utilisé /${commandName}`);
module.exports = async (interaction, title, color, embedContent = "") => {
  const channelID = "1422852024281862155";
  const guild = interaction.guild;
  let logChannel = guild.channels.cache.get(channelID);
  const user = interaction.user.tag;
  const commandName = interaction.commandName;

  //embed
  const embed = createEmbed(
    interaction,
    color,
    title,
    `La commande **${commandName}** a été réalisée\n${embedContent}`
  );

  await logChannel.send({ embeds: [embed] });
  console.log(`✅ Log envoyé : ${user} a utilisé /${commandName}`);
};
