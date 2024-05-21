import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async(event) => {
    const { textGPT } = await readBody(event);

    const completion = await openai.createChatCompletion({
        model: "gpt-4o",
        messages: [{ role: "user", content: textGPT }],
        temperature: 0.1,
        max_tokens: 4095,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0,
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