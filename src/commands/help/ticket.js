// Si la commande requiert des paramètres
const {
  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ChannelType,
} = require("discord.js");
  const sendLog = require("../../utils/sendLog");

module.exports = {

  name: "ticket",

  description: "Créer un ticket privé pour répondre à vos problèmes",

  botPermissions: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {

    //recupere la categorie
    const guild = interaction.guild;
    const category = guild.channels.cache.find(
      (ch) => ch.type === ChannelType.GuildCategory && ch.name === "「 Tickets 🎫 」"
    );
    const adminRoleId = "1418255297621004419";
    const modoRoleId = "1418271428020666508";
    const tickets = interaction.guild.channels.cache
      .filter((channel) => channel.name.startsWith("ticket"))
      .sort((a, b) =>
        parseInt(a.name.split("t").pop() - b.name.split("t").pop())
      )
      .toJSON();

    const newTicketNumber =
      tickets.length > 0
        ? parseInt(tickets[tickets.length - 1].name.split("t").pop()) + 1
        : 1;

    const ticketName = `ticket${String(newTicketNumber).padStart(3, "0")}`;

    const channel = await guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      parent: category.id, 
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: client.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
         {
            id: adminRoleId,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
          {
            id: modoRoleId,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
            ],
          },
      ],
    });

    await interaction.reply({
      content: `✅ Ticket créé : ${channel}`,
      ephemeral: true,
    });

//message d’accueil dans le ticket
  sendLog(interaction, "Ticket", "Green", `**<@${interaction.user.id}>** a ouvert le **${ticketName}!**`)
    await channel.send(
      `👋 Salut <@${interaction.user.id}> ! Merci d’avoir ouvert un ticket.\nExplique ton problème ici, un membre du staff te répondra bientôt.`
    );
  },
}
