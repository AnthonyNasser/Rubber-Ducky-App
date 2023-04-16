import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: 'PUT KEY HERE! - Ants',
})

const openai = new OpenAIApi(configuration)

export default openai

// const completion = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Hello world",
// });
// console.log(completion.data.choices[0].text);
