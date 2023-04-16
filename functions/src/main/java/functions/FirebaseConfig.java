// package functions;

// import java.io.FileInputStream;
// import java.io.IOException;

// import com.google.auth.oauth2.GoogleCredentials;
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;

// public class FirebaseConfig {
//     public static void init() throws IOException {

//         FileInputStream serviceAccount =
//         new FileInputStream("../resources/ducky-ai-201-firebase-adminsdk-br5af-1e84cecb83.json");
      
//       FirebaseOptions options = new FirebaseOptions.Builder()
//         .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//         .build();
      
//       FirebaseApp.initializeApp(options);
//       System.out.println("Firebase app initialized");
//       }
// }
