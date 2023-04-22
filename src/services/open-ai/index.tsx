import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: '',
})

const openai = new OpenAIApi(configuration)

const makeCompletion = async (subject: String, information: String, previousQuestions: [String]) => {
    let prompt = `Pretend you are a student who is learning about ${subject}. 
    You were just told the following information about the topic: ${information}.
    Ask a follow up question that is not one of these questions: ${previousQuestions.map(
        (question) => question + ", "
    )}. Only respond with this unique question.`
    const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.9,
    })
    return completion.data.choices[0].text
}

export { makeCompletion }