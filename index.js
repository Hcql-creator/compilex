import {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
} from "discord.js";
import { config } from "dotenv";
config();

const token = process.env.BOT_TOKEN_KEY;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyCLient) => {
  console.log(`Logged in as ${readyCLient.user.tag}`);
});

client.login(token);

new SlashCommandBuilder().setName("ping").setDescription("Repkies with Pong!");
