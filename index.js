import { Client, Events, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
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
  console.log(`Logged in as ${readyCLient.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "/ping") {
    message.reply("Pong");
  }
});

client.login(token);

const commandeNeedHelp = [
    new SlashCommandBuilder()
    .setName('needhelp')
    .setDescription('Obtenir de l aide pour ouvrir un ticket')
    .toJSON()
]
client.on("messageCreate", async interaction => {
  console.log("Detection")
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'needhelp') {
    await interaction.reply({
      content: '📩 Je vous invite à vous diriger vers le salon **#ticket** pour ouvrir un ticket.',
    });
  }
});