const autoModeration = require("../messageCreate/autoModeration");

module.exports = (client, oldMessage, newMessage) => {
  autoModeration(client, newMessage);
};
