package com.example.phototmanager;

import android.net.Uri;
import android.os.AsyncTask;

import com.example.phototmanager.config.AppConfig;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import okhttp3.Response;

public class NetworkTask_1 extends AsyncTask<Void, Void, String> {

    private static final String BASE_URL = AppConfig.BASE_URL_WITH_SCHEMA;
   //private static final String BASE_URL = "http://192.168.5.80:8080/api/collections";

    private final File imageFile;
    private final String current_collection;

    private final double currentLatitude;

    private final double currentLongitude;


    public NetworkTask_1(File imageFile,String current_collection,double currentLatitude, double currentLongitude) {
        this.imageFile = imageFile;
        this.current_collection = current_collection;
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
                    .addFormDataPart("lat", String.valueOf(currentLatitude))
                    .addFormDataPart("lon", String.valueOf(currentLongitude))
                    .build();

            okhttp3.Request request = new okhttp3.Request.Builder()
                    .url(BASE_URL + current_collection)
                    .post(requestBody)
                    .build();


            Response response = client.newCall(request).execute();
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
