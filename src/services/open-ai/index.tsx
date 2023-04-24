const makeRequest = async () => {
    const response = await fetch('https://us-central1-project-test-382403.cloudfunctions.net/ChatRunner', {
        method: "POST",
        body: JSON.stringify({
            subject: 'linked lists',
            information: 'bananas',
            question: 'What types of problems can be solved with linked lists?',
            promptType: '1',
            previousQuestions: [],
        })
    })
    let textData = await response.text();
    return textData;
}

export default makeRequest


const askInitialQuestionCompletion = async (subject: String) => {
    const response = await fetch('https://us-central1-project-test-382403.cloudfunctions.net/ChatRunner', {
        method: "POST",
        body: JSON.stringify({
            subject: subject,
            promptType: '0',
        })
    })
    let textData = await response.text();
    return textData;
}

const askQuestionCompletion = async (
    subject: String,
    information: String,
    previousQuestions: [String]
) => {
    const response = await fetch('https://us-central1-project-test-382403.cloudfunctions.net/ChatRunner', {
        method: "POST",
        body: JSON.stringify({
            subject: subject,
            information: information,
            promptType: '1',
            previousQuestions: previousQuestions
        })
    })
    let textData = await response.text();
    return textData;
}

const verifyQuestionCompletion = async (
    subject: String,
    question: String,
    information: String
) => {
    const response = await fetch('https://us-central1-project-test-382403.cloudfunctions.net/ChatRunner', {
        method: "POST",
        body: JSON.stringify({
            subject: subject,
            information: information,
            question: question,
            promptType: '2',
        })
    })
    let textData = await response.text();
    return textData;
}

export {
    askInitialQuestionCompletion,
    askQuestionCompletion,
    verifyQuestionCompletion,
}
