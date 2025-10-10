const { TextInputStyle, ActionRowBuilder } = require("discord.js");
const modalCreator = require("../../utils/modals/modalCreator");
const modalTextInput = require("../../utils/modals/modalTextInput");

module.exports = async (client, interaction) => {
  const modal = modalCreator(
    "sondageAddModal",
    "Les options à ajouter au sondage"
  );

  const nameInput1 = modalTextInput(
    "sondageAddTextInput1",
    "Icone",
    "Ex.  ✅ ",
    interaction.message.embeds[0].description === "Creer ici votre sondage" ? "" : interaction.message.embeds[0].description,
    TextInputStyle.Short,
    0,
    150,
    true
  );
  console.log("1")
  const nameInput = modalTextInput(
    "sondageAddTextInput",
    "Les options à ajouter au sondage",
    "Ex. Oui",
    interaction.message.embeds[0].description === "Creer ici votre sondage" ? "" : interaction.message.embeds[0].description,
    TextInputStyle.Short,
    0,
    150,
    true
  );


  const row = new ActionRowBuilder().addComponents(nameInput1);
  const row1 = new ActionRowBuilder().addComponents(nameInput);
  modal.addComponents(row, row1);
  await interaction.showModal(modal);
};
