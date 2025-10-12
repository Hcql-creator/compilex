const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "sondageRemoveModal",
    "Les options à supprimer au sondage"
  );

  const nameInput = modalTextInput(
    "sondageRemoveTextInput",
    "Les options à supprimer au sondage",
    "Ex. ✅",
    "",
    TextInputStyle.Short,
    0,
    150,
    true
  );

  const row = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(row);
  await interaction.showModal(modal);
};
