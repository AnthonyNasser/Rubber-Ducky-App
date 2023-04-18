// import com.google.cloud.functions.HttpFunction;
// import com.google.cloud.functions.HttpRequest;
// import com.google.cloud.functions.HttpResponse;
// import com.google.firebase.cloud.FirestoreClient;
// import com.google.gson.Gson;
// import com.google.api.core.ApiFuture;
// import com.google.cloud.firestore.DocumentReference;
// import com.google.cloud.firestore.DocumentSnapshot;
// import com.google.cloud.firestore.Firestore;

// import java.io.IOException;

// public class ReadFromFirestore implements HttpFunction {
//     public ReadFromFirestore() {
//         MyFirebaseApp.init();
//     }

//     @Override
//     public void service(HttpRequest request, HttpResponse response) throws IOException {
//         // Get Firestore instance
//         Firestore db = FirestoreClient.getFirestore();

//         // Read data from a specific document in a collection
//         String collectionName = "your-collection-name";
//         String documentId = "your-document-id";
//         DocumentReference docRef = db.collection(collectionName).document(documentId);
//         ApiFuture<DocumentSnapshot> future = docRef.get();

//         try {
//             DocumentSnapshot document = future.get();
//             if (document.exists()) {
//                 // Get data as a map and convert it to JSON
//                 String jsonData = new Gson().toJson(document.getData());
//                 response.getWriter().write(jsonData);
//             } else {
//                 response.setStatusCode(HttpResponse.SC_NOT_FOUND);
//                 response.getWriter().write("Document not found");
//             }
//         } catch (InterruptedException | ExecutionException e) {
//             e.printStackTrace();
//             response.setStatusCode(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
//             response.getWriter().write("Error reading data from Firestore");
//         }
//     }
// }

package functions.firestore;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.concurrent.ExecutionException;

public class ReadFromFirestore implements HttpFunction {
    public ReadFromFirestore() {
        MyFirebaseApp.init();
    }

    @Override
    public void service(HttpRequest request, HttpResponse response) throws IOException {
        // Get Firestore instance
        Firestore db = FirestoreClient.getFirestore();

        // Read data from a specific document in a collection
        String collectionName = "users";
        String documentId = "DwT0LadivLQC65wCj4WmRM2ScUj2";
        DocumentReference docRef = db.collection(collectionName).document(documentId);
        ApiFuture<DocumentSnapshot> future = docRef.get();

        try {
            DocumentSnapshot document = future.get();
            if (document.exists()) {
                // Get data as a map and convert it to JSON
                String jsonData = new Gson().toJson(document.getData());
                response.getWriter().write(jsonData);
            } else {
                response.setStatusCode(404);
                response.getWriter().write("Document not found");
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            response.setStatusCode(500);
            response.getWriter().write("Error reading data from Firestore");
        }
    }
}