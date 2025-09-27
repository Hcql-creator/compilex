const { Client, GatewayIntentBits, Partials } = require("discord.js");
const dotenv = require("dotenv");
const eventHandler = require("./handlers/eventHandler");

dotenv.config();

const token = process.env.NOLAN_BOT_TOKEN_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

eventHandler(client);

client.login(token);
