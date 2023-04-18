package functions.openai;
import com.theokanning.openai.service.OpenAiService;

import com.theokanning.openai.completion.CompletionRequest;

public class CompletionSender extends Thread {

    public String subject;
    public String information;
    public String[] previousQuestions;
    
    public String prompt;
    public int promptType; // type 0: ask a question, type 1: verify or whatever
    public String response;
    
    public CompletionSender(String subject, String information, String[] previousQuestions, int promptType) {
        this.subject = subject;
        this.information = information;
        this.previousQuestions = previousQuestions;

        if (promptType == 0) {
            this.prompt = "Pretend you are a student who is learning about " + subject + ". You were just told the following information about the topic: " + information + 
                       ". Ask a follow up question that is not one of these questions: " + String.join(", ", previousQuestions) + ". Only respond with this unique question.";
        } else if (promptType == 1) {
             this.prompt = "Pretend you are an expert at the following subject: " + subject + ". You were just told the following information about the subject: " + information + 
                       ". Is this information accurate?";
        }
    }
    public void run() {
        OpenAiService service = new OpenAiService("open_api_key");
        CompletionRequest completionRequest = CompletionRequest.builder()
                .model("text-davinci-003")
                .prompt(prompt)
                .temperature(0.9)
                .build();
        service.createCompletion(completionRequest).getChoices().forEach(completion -> {
            response = completion.getText().toString();
        });
    }
}