module.exports = (name, value, inline = false) => {
  const embedField = {
    name: name,
    value: value,
    inline: inline,
  };
  return embedField;
};
