const { TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = (
  id,
  label,
  placeholder,
  defaultValue,
  style = TextInputStyle.Short,
  minLength,
  maxLength,
  required = true
) => {
  const modalTextInput = new TextInputBuilder()
    .setCustomId(id)
    .setLabel(label)
    .setStyle(style)
    .setPlaceholder(placeholder)
    .setValue(defaultValue)
    .setMinLength(minLength)
    .setMaxLength(maxLength)
    .setRequired(required);
  return modalTextInput;
};
