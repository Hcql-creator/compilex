import { Client, EmbedBuilder, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
config();

const token = process.env.BOT_TOKEN_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyCLient) => {
  console.log(`Logged emin as ${readyCLient.user.tag}`);
});

const testEmbed = new EmbedBuilder()
  .setColor("FFFFFF")
  .setTitle("Title")
  .setDescription("Ceci est une description courte.")
  .setAuthor("Raf | Admin")
  .setFooter({ text: "Test" });

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "/ping") {
    message.reply(testEmbed);
  }
});

client.login(token);
