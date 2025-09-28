const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "groupWorkDescriptionModal",
    "Description du travail"
  );
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

  const row = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(row);
  await interaction.showModal(modal);
};
