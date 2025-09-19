const { SlashCommandBuilder } = require('@discordjs/builders');

const commande = [
    new SlashCommandBuilder()
    .setName('needHelp')
    .setDescription('Obtenir de l aide pour ouvrir un ticket')
]