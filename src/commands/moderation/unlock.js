const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const sendLog = require("../../utils/sendLog");

module.exports = {
    // Nom de la commande
    name: "unlock",
    // Description de la commande
    description: "Deverouille un salon (personne ne peut écrire)",

    // Permissions requises pour l'utilisateur éxécutant la commande
    permissionsRequired: [PermissionFlagsBits.ManageChannels],

    // Permissions requises pour que le bot puisse éxécuter la commande
    botPermissions: [PermissionFlagsBits.Administrator],

    // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
     callback: async (client, interaction) => {
        const roleEtudiant = interaction.guild.roles.cache.find(
            (role) => role.name === "💼・Etudiants"
        );

        if (!roleEtudiant) {
            return interaction.reply({
                content: `⚠️ Le rôle **${roleEtudiant}** n'existe pas sur ce serveur.`,
                ephemeral: true,
            });
        }

        const salon = interaction.channel;

        try {
            await salon.permissionOverwrites.edit(roleEtudiant, {
                SendMessages: true,
                ViewChannel: true,
            });
            sendLog(interaction, "Salon dévérouillé", "Yellow", `**${salon.name}** n'est plus vérouillé`)
            await interaction.reply({
                content: `🔓 Le salon **${salon.name}** a été deverrouillé pour le rôle **${roleEtudiant.name}**.`,
            });
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "❌ Une erreur est survenue lors du deverrouillage du salon.",
                ephemeral: true,
            });
        }
    },
};
