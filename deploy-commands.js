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
  .toJSON()
];
  

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN_KEY);

(async () => {
    try {
        console.log('Enregistrement des commandes...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Commandes enregistrées !');
    } catch (error) {
        console.error(error);
    }
})();