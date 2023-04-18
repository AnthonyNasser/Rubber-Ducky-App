package functions.openai;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.gson.Gson;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Map;


import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ChatRunner implements HttpFunction {

    @Override
    public void service(HttpRequest request, HttpResponse response) throws IOException {
        // Only accept POST requests
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            response.setStatusCode(405);
            response.getWriter().write("Method not allowed");
            return;
        }

        // Deserialize the request body JSON into a Map
        Gson gson = new Gson();
        String requestBody = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, Object> data = gson.fromJson(requestBody, Map.class);

        if (data == null) {
            response.setStatusCode(400);
            response.getWriter().write("Invalid request data");
            return;
        }

        try {
            // start threads here
            ExecutorService executor = Executors.newFixedThreadPool(2);

            CompletionSender send = new CompletionSender(data.get("subject").toString(), data.get("information").toString(), new String[0], 0); 
            CompletionSender verifySend = new CompletionSender(data.get("subject").toString(), data.get("information").toString(), new String[0], 1);
            executor.execute(send);
            executor.execute(verifySend);
            executor.shutdown();
            while (!executor.isTerminated()) {
                Thread.yield();
            }
            
            response.setStatusCode(201); // Created
            response.getWriter().write(send.response);
            response.getWriter().write(verifySend.response);
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.getWriter().write("Error getting chat response");
        }
    }
}














































// package functions.openai;

// import com.theokanning.openai.completion.chat.ChatCompletionRequest;
// import com.theokanning.openai.completion.chat.ChatMessage;
// import com.theokanning.openai.completion.chat.ChatMessageRole;
// import com.theokanning.openai.service.OpenAiService;


// import com.google.cloud.functions.HttpFunction;
// import com.google.cloud.functions.HttpRequest;
// import com.google.cloud.functions.HttpResponse;
// import java.io.BufferedWriter;
// import java.io.FileWriter;
// import java.io.IOException;

// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;

// import com.theokanning.openai.completion.CompletionRequest;

// public class ChatRunner implements HttpFunction {
//     // chat doc "4Oe9rcJi5HCMricf9adC"

//     @Override
//     public void service(HttpRequest request, HttpResponse response)
//         throws IOException {
            
//         BufferedWriter writer = response.getWriter();

//         OpenAiService service = new OpenAiService("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");

//         System.out.println("\nCreating completion...");
//         CompletionRequest completionRequest = CompletionRequest.builder()
//                 .model("text-davinci-003")
//                 .prompt("What is capital of france. Answer as if you were a mobster.")
//                 .temperature(0.9)
//                 .build();
//         service.createCompletion(completionRequest).getChoices().forEach(completion -> { try {
//             writer.write(completion.getText());
//         } catch (IOException e) {
//             e.printStackTrace();
//         } });


//         // System.out.println("Streaming chat completion...");
//         // final List<ChatMessage> messages = new ArrayList<ChatMessage>();
//         // final ChatMessage systemMessage = new ChatMessage(ChatMessageRole.SYSTEM.value(), "You are a dog and will speak as such.");
//         // messages.add(systemMessage);
//         // ChatCompletionRequest chatCompletionRequest = ChatCompletionRequest
//         //         .builder()
//         //         .model("gpt-3.5-turbo")
//         //         .messages(messages)
//         //         .n(1)
//         //         .maxTokens(50)
//         //         .logitBias(new HashMap<>())
//         //         .build();

//         // service.streamChatCompletion(chatCompletionRequest)
//         //         .doOnError(Throwable::printStackTrace)
//         //         .blockingForEach(completion -> {
//         //             try {
//         //                 writer.write(completion. + "\n");
//         //                 writer.flush();
//         //             } catch (IOException e) {
//         //                 e.printStackTrace();
//         //             }
//         //         });

//         // service.shutdownExecutor();
//         // writer.close();


//         service.shutdownExecutor();
//         // write the response from opena
//         // writer.write(chatCompletionRequest.toString());
//         // writer.write(s)
//     }
//     // public static void main (String [] args) {


    
//     // }
// }