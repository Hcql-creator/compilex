// Si la commande requiert des paramètres
const {
  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Créer un ticket privé pour répondre à vos problèmes",
  botPermissions: [PermissionFlagsBits.Administrator],
  devOnly: true,
  callback: async (client, interraction) => {
    // Récupérer les salons commençant par "tickets" et les tri par ordre croissant
    const tickets = interraction.guild.channels.cache
      .filter((channel) => channel.name.startsWith("ticket"))
      .sort((a, b) =>
        parseInt(a.name.split("t").pop() - b.name.split("t").pop())
      )
      .toJSON();

    // Génère le nouveau numéro de ticket
    const newTicketNumber =
      parseInt(tickets[tickets.length - 1].name.split("t").pop()) + 1;

    // Défini le nom du ticket
    const ticketName = `ticket${String(newTicketNumber).padStart(3, "0")}`;

    // Créer le ticket
    const channel = await interraction.guild.channels.create({
      name: ticketName,
      type: 0,
      permissionOverwrites: [
        // Permissions globale du serveur
        {
          id: interraction.guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },

        // Permisssions pour le créateur du ticket
        {
          id: interraction.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    await interraction.reply({
      content: `➕ Salon ticket crée dans ${channel}`,
      ephemeral: true,
    });
  },
};
