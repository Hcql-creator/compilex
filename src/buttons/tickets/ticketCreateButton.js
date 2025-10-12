const { PermissionFlagsBits } = require("discord.js");

module.exports = async (client, interaction) => {
  // Récupérer les salons commençant par "tickets" et les tri par ordre croissant
  const tickets = interaction.guild.channels.cache
    .filter((channel) => channel.name.startsWith("ticket"))
    .sort((a, b) => parseInt(a.name.split("t").pop() - b.name.split("t").pop()))
    .toJSON();

  // Génère le nouveau numéro de ticket
  let newTicketNumber;
  if (tickets[tickets.length - 1]) {
    newTicketNumber =
      parseInt(tickets[tickets.length - 1].name.split("t").pop()) + 1;
  } else {
    newTicketNumber = 1;
  }

  // Défini le nom du ticket
  const ticketName = `ticket${String(newTicketNumber).padStart(3, "0")}`;

  // Créer le ticket
  const channel = await interaction.guild.channels.create({
    name: ticketName,
    type: 0,
    parent: "1418263721582526655",
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

  // On informe l'utilisateur de la création de son ticket
  await interaction.reply({
    content: `➕ Salon ticket crée dans ${channel}`,
    ephemeral: true,
  });
};
