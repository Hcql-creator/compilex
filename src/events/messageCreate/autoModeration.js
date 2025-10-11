const geminiRequest = require("../../utils/AI/geminiRequest");
const sendLog = require("../../utils/sendLog");

module.exports = async (client, interaction) => {
  if (interaction.guild.id !== "1418256830890770577") return;
  const regexList = [
    /\b(putain|fdp|sale|enculé|nique ta m(ère|ere)|pd|tafiole|palestine|israel|israël|gouine|chienne|fdp|tg|ferme|connard|conard|saloppe|salope|pute|nazi|negger)\b/i,
    /\b(fuck|shit|bitch|bastard|asshole|dick|cunt|slut|whore)\b/i,
    /\b(nigg(a|er)s?|youpin|raton|bougnoule|chinetoque|bicot|fag(got)?|butt|suck|pornhub)\b/i,
    /\b(porno?|xnxx|xvideos|redtube|onlyfans?|camgirl|sex|cum|milf|anal|bdsm|suce|fe(ll | l)ation|bitch)\b/i,
    /\b(kys|suicider?|je vais me tuer|me pendre|je veux mou(r|rr)ir)\b/i,
    /(discord\.gg\/[A-Za-z0-9]+)/i,
    /(free|nitro|gift|steam).*(discord|nitro|steam|gift)/i,
    /(.)\1{5,}/i,
  ];

  let geminiResponse = "";
  for (const regex of regexList) {
    if (interaction.content.toLowerCase().match(regex)) {
      const userInfos = `${
        interaction.author.globalName ??
        interaction.author.username ??
        interaction.author.tag
      } (${interaction.author.id}): ${interaction.content}`;
      console.log("Message sent to GEMINI");
      geminiResponse = await geminiRequest(userInfos, "", false, false, true);
      break;
    }
  }
  console.log("Intra gemini response:", geminiResponse);
  if (geminiResponse === "true" || geminiResponse.includes("true")) {
    console.log("Deleted Message");
    await interaction.delete();
    interaction.channel.send(
      `<@${interaction.author.id}>, message non approprié détecté ! Incident signalé aux administrateurs`
    );
  }
};
