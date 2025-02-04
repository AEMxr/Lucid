const { Configuration, OpenAIApi } = require("openai");
const aiConfig = require("../../config/ai.config");

const configuration = new Configuration({
  apiKey: aiConfig.apiKey,
});

const openai = new OpenAIApi(configuration);

class AIService {
  async conductPersonalityAssessment(userResponses) {
    try {
      const completion = await openai.chat.completions.create({
        model: aiConfig.model,
        messages: [
          { role: "system", content: aiConfig.personalityAssessmentPrompt },
          { role: "user", content: userResponses },
        ],
        max_tokens: aiConfig.maxTokens,
        temperature: aiConfig.temperature,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error("Personality assessment failed: " + error.message);
    }
  }

  async trainUserAvatar(personalityData) {
    try {
      const completion = await openai.chat.completions.create({
        model: aiConfig.model,
        messages: [
          { role: "system", content: aiConfig.avatarTrainingPrompt },
          { role: "user", content: JSON.stringify(personalityData) },
        ],
        max_tokens: aiConfig.maxTokens,
        temperature: aiConfig.temperature,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error("Avatar training failed: " + error.message);
    }
  }
}

module.exports = new AIService();
