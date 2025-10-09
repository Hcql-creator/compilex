const geminiRequest = require("../../utils/AI/geminiRequest");
const sendLog = require("../../utils/sendLog");

module.exports = async (client, interaction) => {
  const urlRegex = /(https?|ftp|file):\/\/[^\s]+/gi;
  const suspisiousLinks = interaction.content.match(urlRegex);
  if (suspisiousLinks) {
    const userInfos = `${
      interaction.author.globalName ??
      interaction.author.username ??
      interaction.author.tag
    } (${interaction.author.id}): ${interaction.content}`;
    let stringOutput = "";
    suspisiousLinks.map((link) => {
      stringOutput += `Lien: ${link}\n`;
    });
    let isLinkSuspicious;
    console.log("Message sent to gemini");
    isLinkSuspicious = await geminiRequest(
      userInfos,
      stringOutput,
      false,
      true
    );
    if (isLinkSuspicious === "true" || isLinkSuspicious.includes("true")) {
      await interaction.delete();
      interaction.channel.send(
        `<@${interaction.author.id}>, lien suspicieux détecté ! Incident signalé aux administrateurs`
      );
    }
  }
};
