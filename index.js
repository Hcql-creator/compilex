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
import { REST, Routes } from "discord.js";

const token = process.env.NOLAN_BOT_TOKEN_KEY;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});


const testEmbed = new EmbedBuilder()
  .setColor("FFFFFF")
  .setTitle("Test commande /pongping")
  .setDescription(
    "Ceci est une Rafael va Ceci est un message de test a la commande /ping"
  )
  .setAuthor({ name: "Raf | le goat supprime pas le tocken stp" })
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
  // BAN
  if (interaction.commandName === "ban") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return interaction.reply({
        content: "❌ Tu n'as pas la permission de bannir des membres.",
        ephemeral: true,
      });
    }
    const member = interaction.options.getUser('utilisateur');
    const reason =
      interaction.options.getString("raison") || "Aucune raison spécifiée";

    const guildMember = interaction.guild.members.cache.get(member.id);
    if (!guildMember) {
      return interaction.reply({
        content: "❌ Membre introuvable sur ce serveur.",
        ephemeral: true,
      });
    }
    if (member.id === interaction.user.id) {
      return interaction.reply({
        content: "❌ Tu ne peux pas te bannir toi-même, champion 🤨",
        ephemeral: true,
      });
    }
    if (member.id === client.user.id) {
      return interaction.reply({
        content: "❌ Je ne peux pas me bannir moi-même.",
        ephemeral: true,
      });
    }
    if (!guildMember.bannable) {
      return interaction.reply({
        content: "❌ Je ne peux pas bannir ce membre.",
        ephemeral: true,
      });
    }
    try {
      await guildMember.ban({ reason });
      await interaction.reply({
        content: `✅ ${member.tag} a été banni.\nRaison : ${reason}`,
      });
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "❌ Une erreur est survenue lors du ban.",
        ephemeral: true,
      });
    }
  }
  if (interaction.commandName === 'ticket') {
    const tickets = interaction.guild.channels.cache
      .filter(c => c.name.startsWith('ticket'))
      .sort((a, b) => b.name.localeCompare(a.name));

    let newTicketNumber = 1;
    if (tickets.size > 0) {
      const lastTicket = tickets.first().name;
      const match = lastTicket.match(/ticket(\d+)/);
      if (match) newTicketNumber = parseInt(match[1]) + 1;
    }

    const ticketName = `ticket${String(newTicketNumber).padStart(3, '0')}`;

    const channel = await interaction.guild.channels.create({
      name: ticketName,
      type: 0,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.ManageChannels
          ],
        },
        ...interaction.guild.members.cache
          .filter(member => member.permissions.has(PermissionsBitField.Flags.Administrator))
          .map(admin => ({
            id: admin.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
              PermissionsBitField.Flags.ManageChannels

            ],
          }))
      ],
    });

    await interaction.reply({ content: `Ticket créé : ${channel}`, ephemeral: true });
  }





  if (interaction.commandName === "mute") {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.reply({
        content: "❌ Tu n'as pas la permission de mute des membres.",
        ephemeral: true
      });
    }

    // Récupérer le membre à mute
    const guildMember = interaction.options.getMember("membre");
    if (!guildMember) {
      return interaction.reply({
        content: "❌ Membre introuvable sur le serveur.",
        ephemeral: true
      });
    }

    // Vérifier que le membre peut être muté
    if (!guildMember.moderatable) {
      return interaction.reply({
        content: "❌ Je ne peux pas mute ce membre (hiérarchie ou permissions).",
        ephemeral: true
      });
    }

    // Vérifier la durée
    const duree = interaction.options.getInteger("duree");
    if (!duree || duree <= 0) {
      return interaction.reply({
        content: "❌ Tu dois indiquer une durée valide en minutes.",
        ephemeral: true
      });
    }

    const reason = interaction.options.getString("raison") || "Aucune raison spécifiée";

    try {
      await guildMember.timeout(duree * 60 * 1000, reason); // timeout en ms
      return interaction.reply({
        content: `✅ ${guildMember.user.tag} a été mute pendant ${duree} minutes.\nRaison : ${reason}`,
        ephemeral: false
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "❌ Une erreur est survenue lors du mute.",
        ephemeral: true
      });
    }
  }




  if (interaction.commandName === "couleur") {
    const couleur = interaction.options.getString('couleur')
    const texte = interaction.options.getString('message') || "Message vide";
    if (!texte) {
      return interaction.reply({
        content: "❌ Vous devez fournir un message à envoyer.",
        ephemeral: true
      });
    }
    let couleurHex;
    switch (couleur) {
      case "red": couleurHex = 0xFF0000; break;
      case "blue": couleurHex = 0x0000FF; break;
      case "green": couleurHex = 0x00FF00; break;
      case "yellow": couleurHex = 0xFFFF00; break;
      case "black": couleurHex = 0x000000; break;
      case "white": couleurHex = 0xFFFFFF; break;
      case "purple": couleurHex = 0x800080; break;
      case "pink": couleurHex = 0xDE3163; break;
      case "brown": couleurHex = 0x4B371C; break;
      default: couleurHex = 0xFFFFFF; // blanc par défaut
    }

    const embed = new EmbedBuilder()
      .setDescription(texte)
      .setColor(couleurHex);
    await interaction.reply({ embeds: [embed] });
  }



  if (interaction.commandName === 'clear') {
    if (!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageMessages)){
      return interaction.reply({ content: `❌ Tu n'as pas les permissions pour effacer les messages !`, ephemeral: true });
    }
    const salon = interaction.channel;

    const overwrites = salon.permissionOverwrites.cache.map(o => ({
      id: o.id,
      allow: o.allow,
      deny: o.deny,
      type: o.type
    }));

    const parentId = salon.parentId;
    const nom = salon.name;

    await salon.delete().catch(err => console.error(err));

    const newSalon = await interaction.guild.channels.create({
      name: nom,
      type: 0, // texte
      parent: parentId || null,
      permissionOverwrites: overwrites
    });

    await newSalon.send("✅ Salon vidé");
  }

  if (interaction.commandName === 'close'){
    const salon = interaction.channel
    if (!interaction.memberPermissions.has(PermissionsBitField.Flags.ManageChannels)){
      return interaction.reply({content: `❌ Tu n'as pas les permissions pour effacer les messages !`,
        ephemeral : true
      })
    }
    await salon.delete().catch(err => console.error(err));

  }
});

client.login(token);