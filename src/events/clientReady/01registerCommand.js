const { testServer } = require("../../../config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  console.log("------ Commands ------");
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        console.log(`/` + `${existingCommand.name}`);
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑️ Deleted command: /${name}`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name,
            description,
            options,
          });
          console.log(`✏️ Edited command: /${name}`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            "Skipping registering for command",
            name,
            "as it is deleted"
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`💾 Command registered: /${name}`);
      }
    }
  } catch (error) {
    console.log("There was an error while registering commands:", error);
  }
};
