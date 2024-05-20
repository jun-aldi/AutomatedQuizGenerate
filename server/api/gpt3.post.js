import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler( async (event) => {
    const { textGPT } = await readBody(event);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [{role: "user", content: textGPT}],
      temperature: 0.1,
      max_tokens: 3000,
      top_p: 1.0,
      frequency_penalty: 1.0,
      presence_penalty: 1.0,
    });

    return {
        result: completion.data.choices[0].message.content,
      }

      // const completion = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: generatePrompt(textGPT),
      //   temperature: 0.4,
      //   max_tokens: 3000,
      //   top_p: 1.0,
      //   frequency_penalty: 1.0,
      //   presence_penalty: 1.0,
      // });
  
      // return {
      //     result: completion.data.choices[0].text,
      //   }
})

function generatePrompt(textGPT) {
    return `
    i would like you to score an ESSAYS written by Bahasa Indonesia. Each ESSAYS is assigned a rating of 0 to 10, with 10 being the highest and 0 the lowest. You don't have to explain why you assign that specific score. Just report a score. The ESSAYS is scored based on the following QUESTION. and give me accurate score when scoring that ESSAYS.
    Format response {score: (score) correction: (correction write in bahasa) accurate score: (accurate score with precentage)}
    me: ${textGPT}
    bot: `;
  }