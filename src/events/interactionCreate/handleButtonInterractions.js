module.exports = (client, interaction) => {
  if (!interaction.isButton()) return;

  console.log("Button interaction detected");
};
