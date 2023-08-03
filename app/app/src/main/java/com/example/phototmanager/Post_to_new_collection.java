package com.example.phototmanager;

import android.content.Context;
import android.os.AsyncTask;
import android.widget.Toast;

import com.example.phototmanager.config.AppConfig;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;

public class Post_to_new_collection extends AsyncTask<Void, Void, String> {

    private static final String BASE_URL = AppConfig.COLLECTION_URL;
    private final File imageFile;

    private final Context context;
    private final String name;

    private final String description;
    private final double currentLatitude;
    private final double currentLongitude;

    public Post_to_new_collection(Context context,File imageFile, String name, String description, double currentLatitude, double currentLongitude) {
        this.context = context;
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
            Toast.makeText(context,"Created new collection",Toast.LENGTH_SHORT).show();
        } else {
           Toast.makeText(context, "Failed to upload data", Toast.LENGTH_SHORT).show();
        }
    }
}
