const { PermissionFlagsBits } = require("discord.js");

module.exports = async (client, interaction) => {
  // Récupérer les salons commençant par "tickets" et les tri par ordre croissant
  const tickets = interaction.guild.channels.cache
    .filter((channel) => channel.name.startsWith("ticket"))
    .sort((a, b) => parseInt(a.name.split("t").pop() - b.name.split("t").pop()))
    .toJSON();

  // Génère le nouveau numéro de ticket
  const newTicketNumber =
    parseInt(tickets[tickets.length - 1].name.split("t").pop()) + 1;

  // Défini le nom du ticket
  const ticketName = `ticket${String(newTicketNumber).padStart(3, "0")}`;

  // Créer le ticker
  const channel = await interaction.guild.channels.create({
    name: ticketName,
    type: 0,
    permissionOverwrites: [
      // Permissions globale du serveur
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },

      // Permisssions pour le créateur du ticket
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

  await interaction.reply({
    content: `➕ Salon ticket crée dans ${channel}`,
    ephemeral: true,
  });
};
