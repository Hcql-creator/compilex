module.exports = {
  name: "needhelp",

  description: "Affiche le lien vers le salon d'aide.",
  devOnly: true,

  callback: (client, interraction) => {
    interraction.reply(
      `📩 Direction le salon <#1419256057666080798> pour obtenir de l'aide.`
    );
  },
};
