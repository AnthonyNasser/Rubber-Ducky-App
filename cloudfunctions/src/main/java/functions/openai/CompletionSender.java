package functions.openai;
import com.theokanning.openai.service.OpenAiService;

import com.theokanning.openai.completion.CompletionRequest;


public class CompletionSender extends Thread {

    public String subject;
    public String information;
    public String[] previousQuestions;
    public String question;
    
    public String prompt;
    public int promptType; // type 0: ask a question, type 1: verify or whatever
    public String response;
    
    public CompletionSender(String subject, String information, String[] previousQuestions, String question, int promptType) {
        this.subject = subject;
        this.information = information;
        this.previousQuestions = previousQuestions;
        this.question = question;

        if (promptType == 0) { // askInitialQuestionCompletion
            this.prompt =  "Pretend you are a student who is learning about " + subject + ". Ask a general question about the topic.";
        } else if (promptType == 1) { // askQuestionCompletion
            this.prompt = "Pretend you are a student who is learning about " + subject + ". You were just told the following information about the topic: " 
            + information + "Ask a follow up question that is not one of these questions: " + String.join(", ", previousQuestions) + "Only respond with this unique question.";
        } else if (promptType == 2) { // verifyQuestionCompletion
            //  this.prompt = "Pretend you are an expert at the following subject: " + subject + ". You were just told the following information about the subject: " + information + 
            //            ". Is this information accurate?";
            this.prompt = "You are speaking with an student attempting to learn the following subject: " + subject +
            "You just asked the following question: " + question + ". and the student responded with the following information about the topic: " + information +
            ". If the information provided is completely correct, respond with '++Yes++', and nothing else." +
            "If the information provided is incorrect, respond with a concise explanation as to why it is incorrect." +
            "If the information provided is requesting that you tell them the answer, respond with 'I can't tell you the answer, but I can give you a hint! [insert hint here]'" +
            "If the information provided is correct, but you need more information, respond with a concise explanation as to why you need more information (this will be the most common response)." +
            "For example, if the information provided is correct, but you need more information, you could respond with 'Your answer may be correct, but I need more information! Please elaborate.'" +
            "For example, if the information provided is incorrect because it is too vague, you could respond with 'Your answer is a bit vague! Please be more specific.'" +
            "Another example is if the information provided is incorrect because it is wrong, you could respond with 'Your answer is incorrect! [insert explanation of why it is incorrect]'" +
            "Another example is if you need clarification on the information provided, you could respond with 'I'm not sure I understand your answer. Can you please clarify?'";
        }
    }
    public void run() {
        OpenAiService service = new OpenAiService("insert_key_here");
        CompletionRequest completionRequest = CompletionRequest.builder()
                .model("text-davinci-003")
                .prompt(prompt)
                .temperature(0.9)
                .maxTokens(200)
                .build();
        service.createCompletion(completionRequest).getChoices().forEach(completion -> {
            response = completion.getText().toString();
        });
    }
}