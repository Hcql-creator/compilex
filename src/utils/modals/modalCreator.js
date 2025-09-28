const { ModalBuilder } = require("discord.js");

module.exports = (id, title) => {
  const modal = new ModalBuilder().setCustomId(id).setTitle(title);
  return modal;
};
