const sendLog = require("../../utils/sendLog");

module.exports = (client, member) => {
  try {
    member.roles.add("1418258329028923532");
  } catch {
    console.log("Erreur lors de l'ajout du role étudiant");
    sendLog(
      member,
      "Echec lors de l'ajout du role étudiant",
      "#FF0000",
      `Le role étudiant n'a pas pu être ajouté à ${member}`
    );
  }
};
