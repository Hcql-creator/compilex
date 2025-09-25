const path = require("path");
const getAllFiles = require("../utils/getAllFiles");
module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);
  console.log("------ Events ------");
  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    // Replace \ with / (for windows support)
    // On récupère tout ce qu'il y à après le dernier /
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    console.log(eventName);

    // On fait un event listener
    client.on(eventName, async (...arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        // On appele notre fonction
        await eventFunction(client, ...arg);
      }
    });
  }
};
