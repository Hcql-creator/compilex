const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  // On créer le modal qui apparaitra quand on cliquera sur le bouton Nom
  const modal = modalCreator("groupWorkNameModal", "Nom du travail");

  // On créer le champ de texte pour le modal et on lui donne:
  // - ID
  // - Nom
  // - Placeholder
  // - Valeur si définie antérieurement
  // - Style Short
  // - Longueur de 3 à 30
  const nameInput = modalTextInput(
    "groupWorkNameTextInput",
    "Nom / Matière du travail",
    "Ex. Exposé Anglais",
    interaction.channel.name,
    TextInputStyle.Short,
    3,
    30,
    true
  );

  // On créer une ligne de composants et on y ajoute notre textInput
  const row = new ActionRowBuilder().addComponents(nameInput);

  // On ajoute notre ligne de composants à notre Modal
  modal.addComponents(row);

  // On affiche notre modal
  await interaction.showModal(modal);
};
