module.exports = {
  name: "needhelp",

  description: "Affiche le lien vers le salon d'aide.",
  devOnly: true,

  callback: (client, interraction) => {
    // On indique la direction du salon #tickets à l'utilisateur
    interraction.reply(
      `📩 Direction le salon <#1418275243310448661> pour obtenir de l'aide.`
    );
  },
};
