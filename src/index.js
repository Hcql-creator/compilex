import {
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  SlashCommandBuilder,
  PermissionsBitField,
} from "discord.js";
import { config } from "dotenv";
import eventHandler from "./handlers/eventHandler.js";
config();
import { REST, Routes } from 'discord.js';

const token = process.env.BOT_TOKEN_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

eventHandler(client);

const testEmbed = new EmbedBuilder()
  .setColor("FFFFFF")
  .setTitle("Test commande /ping")
  .setDescription("Ceci est une Rafael va Ceci est un message de test a la commande /ping")
  .setAuthor({ name: "Raf | le goat supprime pas le tocken stp" })
  .setFooter({ text: "Test" });

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "/ping") {
    message.channel.send({ embeds: [testEmbed] });
  }
});


client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'needhelp') {
    await interaction.reply({
      content: `📩 Direction le salon <#1418547344177102960> pour obtenir de l'aide.`,
    });
  }

  if (interaction.commandName == 'ban'){
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)){
      return interaction.reply({content : "❌ Tu n'as pas la permission de bannir des membres.", ephemeral : true})
    }
    const member = interaction.options.getUser('membre');
    const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';
  
    const guildMember = interaction.guild.members.cache.get(member.id);
    if (!guildMember){
      return interaction.reply({ content: "❌ Membre introuvable sur ce serveur.", ephemeral: true });
    }
   if (member.id === interaction.user.id) {
  return interaction.reply({
    content: "❌ Tu ne peux pas te bannir toi-même, champion 🤨",
    ephemeral: true,
  });
}
     if (member.id === client.user.id) {
      return interaction.reply({ content: "❌ Je ne peux pas me bannir moi-même.", ephemeral: true });
    }
    if (!guildMember.bannable) {
      return interaction.reply({ content: "❌ Je ne peux pas bannir ce membre.", ephemeral: true });
    }
    try {
      await guildMember.ban({ reason });
      await interaction.reply({ content: `✅ ${member.tag} a été banni.\nRaison : ${reason}` });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: "❌ Une erreur est survenue lors du ban.", ephemeral: true });
    }
  }
})


client.login(token)