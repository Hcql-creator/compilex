module.exports = {
  name: "needhelp",

  description: "Affiche le lien vers le salon d'aide.",

  callback: (client, interraction) => {
    interraction.reply({
      content: `📩 Direction le salon <#1419256057666080798> pour obtenir de l'aide.`,
      ephemeral: true,
    });
  },
};
