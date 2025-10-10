const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "sondageDescriptionModal",
    "Description du travail"
  );
  const nameInput = modalTextInput(
    "sondageDescriptionTextInput",
    "Description du sondage",
    "Ex. 1. Qui veut gagner ?",
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
