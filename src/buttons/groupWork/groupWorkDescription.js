const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  // On créer notre modal
  const modal = modalCreator(
    "groupWorkDescriptionModal",
    "Description du travail"
  );

  // On créer le champ de texte pour le modal et on lui donne:
  // - ID
  // - Nom
  // - Placeholder
  // - Description si définie antérieurement
  // - Style Paragraph
  // - Longueur de 10 à 500
  const nameInput = modalTextInput(
    "groupWorkDescriptionTextInput",
    "Description du travail / Étapes à réaliser",
    "Ex. 1. Faires recherches Web \n 2. Faire notes Exposé",
    interaction.message.embeds[0].description,
    TextInputStyle.Paragraph,
    10,
    500,
    true
  );

  // On créer une ligne de composants et on y ajoute notre textInput
  const row = new ActionRowBuilder().addComponents(nameInput);

  // On ajoute notre ligne de composants à notre Modal
  modal.addComponents(row);

  // On affiche notre modal
  await interaction.showModal(modal);
};
