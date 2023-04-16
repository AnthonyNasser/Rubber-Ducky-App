package com.ducky.ducky;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DuckyApplication {

	public static void main(String[] args) {
		initializeFirebase();
		SpringApplication.run(DuckyApplication.class, args);
	}

	private static void initializeFirebase() {
		try {
			// Fetch the service account key JSON file contents
			FileInputStream serviceAccount = new FileInputStream("/home/anthony/Documents/Projects/Rubber-Ducky-App/ducky/src/main/resources/ducky-ai-201-firebase-adminsdk-br5af-1e84cecb83.json");
			FirebaseOptions options = new FirebaseOptions.Builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

			// Initialize the app with a service account, granting admin privileges
			FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			System.err.println("Error initializing Firebase: " + e.getMessage());
			e.printStackTrace();
			System.exit(1);
		}
	}

    public String createCRUD(CRUD crud) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("crud_users").document(crud.getName()).set(crud);

        return collectionApiFuture.get().getUpdateTime().toString();
    }

}
