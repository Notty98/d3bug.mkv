package com.example.phototmanager;

import android.os.AsyncTask;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.Response;

public class NetworkTask extends AsyncTask<Void, Void, String> {

    private static final String BASE_URL = "http://192.168.1.51:8080/api/collections";
   //private static final String BASE_URL = "http://192.168.5.80:8080/api/collections";

    private final File imageFile;

    private final String name;

    private final String description;
    private final double currentLatitude;
    private final double currentLongitude;

    public NetworkTask(File imageFile, String name, String description, double currentLatitude, double currentLongitude) {
        this.imageFile = imageFile;
        this.name = name;
        this.description = description;
        this.currentLatitude = currentLatitude;
        this.currentLongitude = currentLongitude;
    }

    @Override
    protected String doInBackground(Void... voids) {
        try {
            OkHttpClient client = new OkHttpClient();

            // Create the multipart request body
            RequestBody requestBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart("photo", imageFile.getName(), RequestBody.create(MediaType.parse("image/jpeg"), imageFile))
                    .addFormDataPart("name", name)
                    .addFormDataPart("desc", description)
                    .addFormDataPart("lat", String.valueOf(currentLatitude))
                    .addFormDataPart("lon", String.valueOf(currentLongitude))
                    .build();

            okhttp3.Request request = new okhttp3.Request.Builder()
                    .url(BASE_URL)
                    .post(requestBody)
                    .build();


            okhttp3.Response response = client.newCall(request).execute();
            // Handle the response
            if (response.isSuccessful()) {
                // Request successful
                return response.body().string();
            } else {
                // Request failed
                return null;
            }
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    protected void onPostExecute(String result) {
        super.onPostExecute(result);
        if (result != null) {
            // Do something with the response
        } else {
            // Request failed
           // Toast.makeText(android.MainActivity.this, "Failed to upload data", Toast.LENGTH_SHORT).show();
        }
    }
}
