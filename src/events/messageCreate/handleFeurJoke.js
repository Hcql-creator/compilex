module.exports = (client, interaction) => {
  const responses = [
    "feur!!!",
    "fure!!!",
    "feuse!!!",
    "dratique ²",
    "drilatère □",
    "de neuf???",
    "driceps 🥩",
    "rtz!!!",
    "druplé!!!",
    "lcomm!!!",
    "rtet!!!",
    "tuor 🎶",
    "d!!!",
    "dricolore!!!",
    "terback 🪖",
    "drillage!!!",
    "sterion 🤔🤔🤔",
  ];
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(responses);

  const messageContent = interaction.content;
  const lastWord = messageContent.split(" ");
  for (let i = lastWord.length - 1; i > 0; i -= 1) {
    if (!lastWord[i].match(/[a-zA-Z]+/g)) {
      lastWord.pop();
    }
  }

  let jokeCompleted = false;

  // Mot plein
  if (lastWord[lastWord.length - 1].toLowerCase().endsWith("quoi")) {
    interaction.channel.send(responses[0]);
    jokeCompleted = true;
  }

  // Quoi suivit (collé) de caracteres
  if (!jokeCompleted) {
    let word = lastWord[lastWord.length - 1].toLowerCase();
    for (let i = 0; i < word.length; i += 1) {
      // Si le dernier caractere n'est pas une lettre on le supprime
      if (!word[word.length - 1].toLowerCase().match(/[a-z]/g)) {
        word = word.slice(0, -1);
      }
    }

    if (word.toLowerCase().endsWith("quoi")) {
      interaction.channel.send(responses[0]);
      jokeCompleted = true;
    }
  }
};
