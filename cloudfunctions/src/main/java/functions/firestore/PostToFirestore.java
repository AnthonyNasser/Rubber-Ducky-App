package functions.firestore;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.gson.Gson;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class PostToFirestore implements HttpFunction {
    public PostToFirestore() {
        MyFirebaseApp.init();
    }

    @Override
    public void service(HttpRequest request, HttpResponse response) throws IOException {
        // Only accept POST requests
        if (!"POST".equalsIgnoreCase(request.getMethod())) {
            response.setStatusCode(405);
            response.getWriter().write("Method not allowed");
            return;
        }

        // Get Firestore instance
        Firestore db = FirestoreClient.getFirestore();

        // Get the target collection
        String collectionName = "users";
        CollectionReference collectionRef = db.collection(collectionName);

        // Deserialize the request body JSON into a Map
        Gson gson = new Gson();
        String requestBody = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        Map<String, Object> data = gson.fromJson(requestBody, Map.class);

        if (data == null) {
            response.setStatusCode(400);
            response.getWriter().write("Invalid request data");
            return;
        }

        // Add the data to the collection
        ApiFuture<DocumentReference> result = collectionRef.add(data);

        try {
            DocumentReference documentReference = result.get();
            String documentId = documentReference.getId();
            response.setStatusCode(201); // Created
            response.getWriter().write("Document added with ID: " + documentId);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.getWriter().write("Error writing data to Firestore");
        }
    }
}