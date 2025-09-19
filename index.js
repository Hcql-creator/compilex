import {
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  SlashCommandBuilder,
} from "discord.js";
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
  .setAuthor({ name: "Raf | Admin" })
  .setFooter({ text: "Test" });

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "/ping") {
    message.channel.send({ embeds: [testEmbed] });
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "needhelp") {
    await interaction.reply({
      content: `📩 Direction le salon <#1418547344177102960> pour ouvrir un ticket.`,
      ephemeral: true,
    });
  }
});

client.login(token);
