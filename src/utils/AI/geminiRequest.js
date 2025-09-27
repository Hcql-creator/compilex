const { GoogleGenAI } = require("@google/genai");
const { geminiRecapCustomInstructions } = require("../../../config.json");

module.exports = async (prompt, additionnalInfos = "", recap = false) => {
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
  return finalResponse;
};
