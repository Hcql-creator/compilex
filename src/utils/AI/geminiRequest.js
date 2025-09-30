const { GoogleGenAI } = require("@google/genai");
const {
  geminiRecapCustomInstructions,
  geminiLinkAnalysisInstructions,
} = require("../../../config.json");

module.exports = async (
  prompt,
  additionnalInfos = "",
  recap = false,
  suspisiousLinks = false
) => {
  const ai = new GoogleGenAI({});
  // PROMPT
  let finalPrompt;
  if (recap) {
    finalPrompt =
      geminiRecapCustomInstructions +
      "!!!" +
      additionnalInfos +
      "!!!" +
      "Conversation à résumer: \n" +
      prompt;
  } else if (suspisiousLinks) {
    finalPrompt =
      geminiLinkAnalysisInstructions +
      prompt +
      "Liens suspects détectés (il peut y en avoir d'autres cachés dans le message, répond quoiqu'il arrive par true ou false en fonction de la suspicion des liens):\n" +
      additionnalInfos;
  } else {
    finalPrompt = prompt;
  }
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    },
    // !!!! FAIRE CUSTOM INSTRUCTIONS PROMPT NORMAL !!!!
    contents: finalPrompt,
  });
  const finalResponse =
    response.text.length > 2000 ? "Réponse trop longue" : response.text;
  console.log("GEMINI RESPONSE:", response.text);
  console.log("Gemini finished");
  return finalResponse;
};
