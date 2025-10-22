const handleSuspisiousLinks = require("../messageCreate/handleSuspisiousLinks");

module.exports = (client, oldMessage, newMessage) => {
  handleSuspisiousLinks(client, newMessage);
};
