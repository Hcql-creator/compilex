const {
    ApplicationCommandOptionType,


    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonStyle,
} = require("discord.js");
const embedCreator = require("../../utils/embeds/embedCreator");
const buttonCreator = require("../../utils/buttonCreators/buttonCreator");

module.exports = {

    name: "sondage",

    description: "Créer un sondage",

    // Permissions requises pour l'utilisateur éxécutant la commande
    permissionsRequired: [PermissionFlagsBits.Administrator],

    // Permissions requises pour que le bot puisse éxécuter la commande
    botPermissions: [PermissionFlagsBits.Administrator],

    // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
    callback: (client, interraction) => {
        const principal = embedCreator(
            interraction,
            "Green",
            "Creation sondage",
            " ",
        )
        const row = new ActionRowBuilder();
        row.addComponents(
            buttonCreator(
                "sondageName",
                "Titre",
                "⏲️",
                ButtonStyle.Primary
            ),
            buttonCreator(
                "sondageDescription",
                "Description",
                "⏲️",
                ButtonStyle.Secondary
            ),
            buttonCreator(
                "sondageAdd",
                "AddOptions",
                "⏲️",
                ButtonStyle.Success
            ),
            buttonCreator(
                "sondageRemove",
                "RemoveOptions",
                "⏲️",
                ButtonStyle.Danger
            ),
            buttonCreator(
                "sondageBeggin",
                "Beggin",
                "⏲️",
                ButtonStyle.Secondary
            ),
        
        )

            interraction.channel.send({
                embeds: [principal],
                components: [row],
            })
},
};
