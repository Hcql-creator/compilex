const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  // On créer le modal qui apparaitra quand on cliquera sur le bouton Deadline
  const modal = modalCreator(
    "groupWorkDeadlineModal",
    "Deadline (date limite)"
  );

  // On récupère la deadline actuelle
  const value = interaction.message.embeds[0].fields[2].value;

  // On créer le champ de texte pour le modal et on lui donne:
  // - ID
  // - Nom
  // - Placeholder
  // - Valeur si définie antérieurement
  // - Style Short
  // - Longueur de 2 à 15
  const nameInput = modalTextInput(
    "groupWorkDeadlineTextInput",
    "Date de rendu / présentation du travail",
    "Ex. 13/12/2025 | Ex. Jeudi prochain",
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
