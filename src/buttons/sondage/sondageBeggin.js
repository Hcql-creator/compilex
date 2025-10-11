const { ChannelType } = require("discord.js");

module.exports = async (client, interaction) => {
  // Déférer la réponse
  await interaction.deferReply({ ephemeral: true });

  const embed = interaction.message.embeds[0];
  const guild = interaction.guild;

  // Récupérer le salon "sondage"
  const sondageChannel = guild.channels.cache.find(
    ch => ch.type === ChannelType.GuildText && ch.name === "🤔・sondage"
  );
  if (!sondageChannel) return interaction.editReply("❌ Le salon '🤔・sondage' n'existe pas !");

  // Envoyer le message d'alerte et l'embed
  await sondageChannel.send("@everyone Un nouveau sondage est disponible !");
  const sondageMessage = await sondageChannel.send({ embeds: [embed] });

  // Extraire les lignes et emojis autorisés
  const lines = embed.description.split("\n").map(l => l.trim()).filter(Boolean);
  const allowedEmojis = [];
  for (const line of lines) {
    const emojis = line.match(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u);
    if (emojis) {
      const emoji = emojis[0];
      allowedEmojis.push(emoji);
      try {
        await sondageMessage.react(emoji);
      } catch (err) {
        console.log(`Impossible de réagir avec ${emoji} :`, err);
      }
    }
  }

  // Créer le collector de réactions
  const collector = sondageMessage.createReactionCollector({
    filter: (reaction, user) => !user.bot && reaction.message.id === sondageMessage.id,
    dispose: true
  });

  collector.on("collect", async (reaction, user) => {
    const member = await guild.members.fetch(user.id);

    // Supprimer toute réaction non autorisée
    if (!allowedEmojis.includes(reaction.emoji.name)) {
      await reaction.users.remove(user.id).catch(console.error);
      return;
    }

    // Supprimer les autres réactions de cet utilisateur
    for (const react of sondageMessage.reactions.cache.values()) {
      if (react.emoji.name !== reaction.emoji.name) {
        await react.users.remove(user.id).catch(console.error);
      }
    }

    // Ajouter le rôle correspondant
    const roleName = reaction.emoji.name;
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (role) member.roles.add(role).catch(console.error);
  });

  collector.on("remove", async (reaction, user) => {
    // Enlever le rôle si la réaction est retirée
    const member = await guild.members.fetch(user.id);
    const roleName = reaction.emoji.name;
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (role) member.roles.remove(role).catch(console.error);
  });

  // Confirmer l'interaction
  await interaction.editReply("✅ Sondage créé avec succès !");
};
