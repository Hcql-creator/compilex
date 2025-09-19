import { Client, Events, EmbedBuilder, GatewayIntentBits, SlashCommandBuilder } from "discord.js";
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

client.login(token);

/*const commandeNeedHelp = [
    new SlashCommandBuilder()
    .setName('needhelp')
    .setDescription('Obtenir de l aide pour ouvrir un ticket')
    .toJSON()
]
client.on(Events.InteractionCreate, async interaction => {
  console.log("Detection")
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'needhelp') {
    await interaction.reply({
      content: '📩 Je vous invite à vous diriger vers le salon **#ticket** pour ouvrir un ticket.',
    });
  }
});*/


const commands = [
  new SlashCommandBuilder()
    .setName('needhelp')
    .setDescription('Obtenir de l aide pour ouvrir un ticket')
    .toJSON(),
];

// Enregistrement des commandes pour le serveur (guild) - utile en dev

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'needhelp') {
    await interaction.reply({
      content: `📩 Direction le salon <#1418547344177102960> pour ouvrir un ticket.`,
      ephemeral: true
    });
  }
});


