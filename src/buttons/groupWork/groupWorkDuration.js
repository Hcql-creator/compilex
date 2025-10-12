const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  // On créer notre modal
  const modal = modalCreator(
    "groupWorkDurationModal",
    "Durée de la tâche (unité libre)"
  );

  // On récupère la deadline actuelle
  const value = interaction.message.embeds[0].fields[1].value;

  // On créer le champ de texte pour le modal et on lui donne:
  // - ID
  // - Nom
  // - Placeholder
  // - Description si définie antérieurement
  // - Style Paragraph
  // - Longueur de 10 à 500
  const nameInput = modalTextInput(
    "groupWorkDurationTextInput",
    "Durée estimée du travail",
    "Ex. 1h30 à 2h",
    value,
    TextInputStyle.Short,
    2,
    15,
    true
  );

  // On créer une ligne de composants et on y ajoute notre textInput
  const row = new ActionRowBuilder().addComponents(nameInput);

  // On ajoute notre ligne de composants à notre Modal
  modal.addComponents(row);

  // On affiche notre modal
  await interaction.showModal(modal);
};
