import {
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  SlashCommandBuilder,
  PermissionsBitField,
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
      content: `📩 Direction le salon <#1418547344177102960> pour obtenir de l'aide.`,
    });
  }
});

const commands = [
  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un membre du serveur')
    .addUserOption((option) =>
      option.setName('membre').setDescription('Le membre à bannir').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('raison').setDescription('Raison du bannissement').setRequired(false)
    )
    .toJSON(),
];

// Enregistrement de la commande slash dans un serveur spécifique
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🔁 Enregistrement de la commande /ban...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('✅ Commande /ban enregistrée avec succès.');
  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement de la commande :', error);
  }
})();

// Quand le bot est prêt
client.once(Events.ClientReady, () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// Interaction (slash command)
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ban') {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({
        content: '❌ Tu n\'as pas la permission de bannir des membres.',
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser('membre');
    const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) {
      return interaction.reply({
        content: '❌ Ce membre n\'est pas présent sur ce serveur.',
        ephemeral: true,
      });
    }

    if (!member.bannable) {
      return interaction.reply({
        content: '❌ Je ne peux pas bannir ce membre (rôle trop élevé ?).',
        ephemeral: true,
      });
    }

    try {
      await member.ban({ reason });
      await intera
