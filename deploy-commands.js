import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';
config();

const commands = [
  new SlashCommandBuilder()
  .setName('needhelp')
  .setDescription('Vous redirige vers de l aide'),
  new SlashCommandBuilder()
  .setName('ticket')
  .setDescription('Ouvre un ticket.')
  .toJSON(),
  new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un utilisateur du serveur')
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription("L'utilisateur à bannir")
            .setRequired(true))
    .addStringOption(option =>
        option.setName('raison')
            .setDescription('La raison du bannissement')
            .setRequired(false))
];
  

const rest = new REST({ version: '10' }).setToken(process.env.NOLAN_BOT_TOKEN_KEY);

(async () => {
    try {
        console.log('Enregistrement des commandes...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_NOLAN, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Commandes enregistrées !');
    } catch (error) {
        console.error(error);
    }
})();
