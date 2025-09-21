module.exports = {
  name: "ping",
  description: "Pong!",
  callback: (client, interraction) => {
    interraction.reply("Pong !");
  },
};
