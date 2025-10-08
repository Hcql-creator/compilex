const { GoogleGenAI } = require("@google/genai");
const {
  geminiRecapCustomInstructions,
  geminiLinkAnalysisInstructions,
  geminiAutoModeractionAnalysisInstructions,
} = require("../../../config.json");

module.exports = async (
  prompt,
  additionnalInfos = "",
  recap = false,
  suspisiousLinks = false,
  autoMod = false
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
    finalPrompt = geminiLinkAnalysisInstructions + prompt;
  } else if (autoMod) {
    finalPrompt = geminiAutoModeractionAnalysisInstructions + prompt;
  } else {
    finalPrompt = prompt;
  }
  console.log(finalPrompt);
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
  