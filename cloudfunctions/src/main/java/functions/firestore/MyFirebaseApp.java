
package functions.firestore;

import java.io.FileInputStream;
import java.io.IOException;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
// import com.google.firebase.cloud.FirestoreClient;

public class MyFirebaseApp {
    public static void init() {
        try {
            // FileInputStream serviceAccount = new FileInputStream("/Users/nickraskop/Desktop/Rubber-Ducky-App/functions/ducky-ai-201-firebase-adminsdk-br5af-c7ef9eb3d0.json");
            FileInputStream serviceAccount = new FileInputStream("ducky-ai-201-firebase-adminsdk-br5af-c7ef9eb3d0.json");
            FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                // .setDatabaseUrl("https://your-project-id.firebaseio.com")
                .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}