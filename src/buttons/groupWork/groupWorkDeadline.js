const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "groupWorkDeadlineModal",
    "Deadline (date limite)"
  );
  const value = interaction.message.embeds[0].fields[2].value;
  const nameInput = modalTextInput(
    "groupWorkDeadlineTextInput",
    "Date de rendu / présentation du travail",
    "Ex. 13/12/2025 | Ex. Jeudi prochain",
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
