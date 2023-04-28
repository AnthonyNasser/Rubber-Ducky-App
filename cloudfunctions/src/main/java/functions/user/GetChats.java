package functions.user;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.gson.Gson;

import functions.firestore.MyFirebaseApp;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class GetChats implements HttpFunction {
    public GetChats() {
        MyFirebaseApp.init();
    }

    @Override
    public void service(HttpRequest request, HttpResponse response) throws IOException {
        // Get Firestore instance
        Firestore db = FirestoreClient.getFirestore();

        // Get the target collection
        String collectionName = "chats";
        String emailToSearch = request.getFirstQueryParameter("email").orElse(null); // Replace this with the email you want to search for

        // Create a query for documents with the specified email
        Query query = db.collection(collectionName).whereEqualTo("email", emailToSearch);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        try {
            List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();
            if (!documents.isEmpty()) {
                // Convert the documents to JSON
                Gson gson = new Gson();
                String jsonData = gson.toJson(documents);
                response.getWriter().write(jsonData);
            } else {
                response.setStatusCode(404);
                response.getWriter().write("No documents found with email: " + emailToSearch);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.getWriter().write("Error querying data from Firestore");
        }
    }
}