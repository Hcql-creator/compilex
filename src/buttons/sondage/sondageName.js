const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator("sondageNameModal", "Nom du sondage");
  const nameInput = modalTextInput(
    "sondageNameTextInput",
    "Sujet du sondage",
    "Ex. Qui veut gagner ?",
    interaction.channel.name,
    TextInputStyle.Short,
    3,
    30,
    true
  );

  const row = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(row);
  await interaction.showModal(modal);
};
