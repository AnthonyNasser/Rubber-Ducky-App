import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import axios from 'axios'

const app = express()

app.use(
    '/api',
    createProxyMiddleware({
        target: 'https://us-central1-project-test-382403.cloudfunctions.net',
        changeOrigin: true,
    })
)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

const makeRequest = async () => {
    try {
        const response = await axios.post('/api/chatrunner', {
            subject: 'linked lists',
            information: 'bananas',
            question: 'What types of problems can be solved with linked lists?',
            promptType: '1',
            previousQuestions: [],
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export default makeRequest

// import { Configuration, OpenAIApi } from 'openai'

// const configuration = new Configuration({
//     apiKey: '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',
// })

// const openai = new OpenAIApi(configuration)

// const askInitialQuestionCompletion = async (subject: String) => {
//     let prompt = `Pretend you are a student who is learning about ${subject}.
//     Ask a general question about the topic.`
//     const completion = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 100,
//         temperature: 0.9,
//     })
//     return completion.data.choices[0].text?.trim()
// }

// const askQuestionCompletion = async (
//     subject: String,
//     information: String,
//     previousQuestions: [String]
// ) => {
//     let prompt = `Pretend you are a student who is learning about ${subject}.
//     You were just told the following information about the topic: ${information}.
//     Ask a follow up question that is not one of these questions: ${previousQuestions.map(
//         (question) => question + ', '
//     )}. Only respond with this unique question.`
//     const completion = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 100,
//         temperature: 0.9,
//     })
//     return completion.data.choices[0].text?.trim()
// }

// const verifyQuestionCompletion = async (
//     subject: String,
//     question: String,
//     information: String
// ) => {
//     let prompt = `You are speaking with an student attempting to learn the following subject: ${subject}.
//     You just asked the following question: ${question}, and the student responded with the following information about the topic: ${information}.
//     If the information provided is completely correct, respond with "++Yes++", and nothing else.
//     If the information provided is incorrect, respond with a concise explanation as to why it is incorrect.
//     If the information provided is requesting that you tell them the answer, respond with "I can't tell you the answer, but I can give you a hint! [insert hint here]"
//     If the information provided is correct, but you need more information, respond with a concise explanation as to why you need more information (this will be the most common response).
//     For example, if the information provided is correct, but you need more information, you could respond with "Your answer may be correct, but I need more information! Please elaborate.
//     For example, if the information provided is incorrect because it is too vague, you could respond with "Your answer is a bit vague! Please be more specific.
//     Another example is if the information provided is incorrect because it is wrong, you could respond with "Your answer is incorrect! [insert explanation of why it is incorrect]"
//     Another example is if you need clarification on the information provided, you could respond with "I'm not sure I understand your answer. Can you please clarify?`
//     const completion = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 100,
//         temperature: 0.9,
//     })
//     return completion.data.choices[0].text?.trim()
// }

// export {
//     askInitialQuestionCompletion,
//     askQuestionCompletion,
//     verifyQuestionCompletion,
// }
