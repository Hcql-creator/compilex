const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "groupWorkDurationModal",
    "Durée de la tâche (unité libre)"
  );
  const value = interaction.message.embeds[0].fields[1].value;
  const nameInput = modalTextInput(
    "groupWorkDurationTextInput",
    "Durée estimée du travail",
    "Ex. 1h30 à 2h",
    value === "Non-Spécifiée" ? "N/D" : value,
    TextInputStyle.Short,
    2,
    15,
    true
  );
  const row = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(row);
  await interaction.showModal(modal);
};
