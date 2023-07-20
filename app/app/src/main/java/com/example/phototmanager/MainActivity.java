package com.example.phototmanager;

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.Icon;
import android.location.Location;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.phototmanager.config.AppConfig;
import com.mapbox.geojson.Point;
import com.mapbox.maps.MapView;
import com.mapbox.maps.MapboxMap;
import com.mapbox.maps.plugin.annotation.AnnotationConfig;
import com.mapbox.maps.plugin.annotation.AnnotationPlugin;
import com.mapbox.maps.plugin.annotation.AnnotationPluginImplKt;
import com.mapbox.maps.plugin.annotation.generated.PointAnnotationManager;
import com.mapbox.maps.plugin.annotation.generated.PointAnnotationManagerKt;
import com.mapbox.maps.plugin.annotation.generated.PointAnnotationOptions;
import com.mapbox.maps.viewannotation.ViewAnnotationManager;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {


    private static final int LOCATION_PERMISSION_REQUEST_CODE = 100;
    private double currentLatitude;
    private double currentLongitude;
    private ArrayList<ListItem> items = new ArrayList<>();
    private ArrayList<ListItem> collections = new ArrayList<>();
    private ListItem listItem;
    private ListItem list_collection;
    private CustomAdapter adapter;
    private CustomAdapter adapter_1;
    private static final int STORAGE_PERMISSION_REQUEST_CODE = 1;
    private Button btnCamera;
    private Button submitButton;
    private Button newButton;
    private Button addButton;
    private EditText name;
    private EditText name1;
    private String photo_name;
    private String photo_name1;
    private EditText description;
    private EditText editTextInteger;
    private Button submit_int;
    private Button gallery_button;
    private String photo_description;
    private ActivityResultLauncher<Intent> cameraLauncher;
    private boolean isPhotoTaken = false;
    private int userInput;
    private Spinner spinner;
    private Spinner spinner_1;
    private int selected_collection_1;
    private String id_collection;
    private MapView mapView;
    private Button button_map;

    View afterPhotoLayout;
    Button search;
    String finalUrl1;
    List<String> collectionID = new ArrayList<>();
    List<String> collectionNames = new ArrayList<>();

    @Override
    public void onBackPressed() {
        switchToMainLayout();
    }




    private void updatePosition(double latitude, double longitude) {
        currentLatitude = latitude;
        currentLongitude = longitude;
    }

    public void OpenGallery(){
        setContentView(R.layout.gallery_layout);
        spinner_1 = findViewById(R.id.spinner_1);
        Button submitButton_1 = findViewById(R.id.submitButton_1);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, AppConfig.COLLECTION_URL, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray dataArray = response.getJSONArray("data");


                            for (int i = 0; i < dataArray.length(); i++) {
                                JSONObject dataObj = dataArray.getJSONObject(i);
                                String collectionId = dataObj.getString("collection_id");
                                String collectionName = dataObj.getString("collection_name");
                                collectionID.add(collectionId);
                                collectionNames.add(collectionName);
                            }

                            ArrayAdapter<String> adapter = new ArrayAdapter<>(
                                    MainActivity.this,
                                    android.R.layout.simple_spinner_item,
                                    collectionNames
                            );
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            spinner_1.setAdapter(adapter);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        );

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);

        submitButton_1.setOnClickListener(new View.OnClickListener() {


                @Override
                public void onClick(View view) {

                    selected_collection_1 = spinner_1.getSelectedItemPosition();
                    id_collection = collectionID.get(selected_collection_1);
                    String url = AppConfig.COLLECTION_URL + "/" + id_collection + "/photos";

                    JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET,url, null,
                            new Response.Listener<JSONObject>() {

                                @Override
                                public void onResponse(JSONObject response) {

                                    try {

                                        JSONArray dataArray = response.getJSONArray("data");
                                        collections.clear();
                                        for (int i = 0; i < dataArray.length(); i++) {

                                                list_collection = new ListItem(response.getJSONArray("data").getJSONObject(i).getString("filename"), AppConfig.PHOTO_URL + response.getJSONArray("data").getJSONObject(i).getString("filename"));
                                                collections.add(list_collection);
                                            }

                                            setContentView(R.layout.collection_view);
                                            ListView list_collection_view = findViewById(R.id.list_1);
                                            adapter_1 = new CustomAdapter(MainActivity.this, collections);
                                            list_collection_view.setAdapter(adapter_1);




                                          } catch(Exception e){
                                            e.printStackTrace();
                                        }

                                }
                            }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            // Code for handling errors
                            error.printStackTrace();
                            // ...
                        }
                    });
                    //RequestQueue requestQueue = Volley.newRequestQueue(MainActivity.this);
                   // requestQueue.add(request);
                    Volley.newRequestQueue(MainActivity.this).add(request);

                }
            });


    }
    public void MakeGetRequest_list(){
        ListView listView = findViewById(R.id.list);
        Uri.Builder new_builder = new Uri.Builder();
        new_builder.scheme("http")
                .encodedAuthority(AppConfig.baseApiUrl)
                .appendEncodedPath(AppConfig.PHOTOS_PATH)
                .appendQueryParameter("n", String.valueOf(userInput))
                .appendQueryParameter("lat", String.valueOf(currentLatitude))
                .appendQueryParameter("lon", String.valueOf(currentLongitude));

        finalUrl1 = new_builder.build().toString();

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, finalUrl1, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            for(int i = 0; i< userInput ;i++)

                            {
                                listItem = new ListItem(response.getJSONArray("data").getJSONObject(i).getString("filename"),AppConfig.PHOTO_URL + response.getJSONArray("data").getJSONObject(i).getString("filename"));
                                // listItem = new ListItem(response.getJSONArray("data").getJSONObject(i).getString("filename"),"http://192.168.5.80:8080/resources/" + response.getJSONArray("data").getJSONObject(i).getString("filename"));
                                items.add(listItem);
                            }

                            adapter = new CustomAdapter(MainActivity.this,items);
                            listView.setAdapter(adapter);


                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // Code for handling errors
                // ...
            }
        });
        Volley.newRequestQueue(this).add(request);

    }



    public void MakeGetRequest_menu(){
        spinner = findViewById(R.id.spinner);


        finalUrl1 = AppConfig.COLLECTION_URL;

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, finalUrl1, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray dataArray = response.getJSONArray("data");


                            for (int i = 0; i < dataArray.length(); i++) {
                                JSONObject dataObj = dataArray.getJSONObject(i);
                                String collectionId = dataObj.getString("collection_id");
                                String collectionName = dataObj.getString("collection_name");
                                collectionID.add(collectionId);
                                collectionNames.add(collectionName);
                            }

                            ArrayAdapter<String> adapter = new ArrayAdapter<>(
                                    MainActivity.this,
                                    android.R.layout.simple_spinner_item,
                                    collectionNames
                            );
                            adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                            spinner.setAdapter(adapter);
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        );

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);


    }


    public void goToSecondLayout() {
        try {
            setContentView(R.layout.input_integer);
            editTextInteger = findViewById(R.id.editTextInteger);
            submit_int = findViewById(R.id.submit_int);
            submit_int.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    String input = editTextInteger.getText().toString();
                    // Parse the string input to an integer
                    try {
                        int enteredInteger = Integer.parseInt(input);
                       userInput = enteredInteger;

                        switchToMainLayout();
                        // Do something with the entered integer
                        // ...
                    } catch (NumberFormatException e) {
                        Toast.makeText(MainActivity.this, "Invalid input", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    public void switchToMainLayout(){
        setContentView(R.layout.activity_main);
        btnCamera = findViewById(R.id.button_camera);
        getCurrentLocation();
        updatePosition(currentLatitude,currentLongitude);
        System.out.println(currentLatitude + currentLongitude);
        gallery_button =findViewById(R.id.gallery);
        gallery_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                OpenGallery();
            }
        });
        search = findViewById(R.id.search);
        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToSecondLayout();
            }
        });

        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PackageManager packageManager = getPackageManager();
                if (packageManager.hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {
                    if (cameraLauncher != null) {
                        try {
                            // Launch the camera
                            cameraLauncher.launch(null);
                        } catch (Exception e) {
                            Toast.makeText(MainActivity.this, "Failed to launch camera", Toast.LENGTH_SHORT).show();
                            e.printStackTrace();
                        }
                    } else {
                        // No camera available on the device
                        Toast.makeText(MainActivity.this, "No camera available", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        });

        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isCameraAvailable()) {
                    dispatchTakePictureIntent();
                    getCurrentLocation();
                    updatePosition(currentLatitude, currentLongitude);
                } else {
                    Toast.makeText(MainActivity.this, "No camera app found", Toast.LENGTH_SHORT).show();
                }
            }
        });

        items.clear();
        MakeGetRequest_list();
    }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                != PackageManager.PERMISSION_GRANTED) {
            // Permission is not granted, request it
            ActivityCompat.requestPermissions(this,
                    new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE}, STORAGE_PERMISSION_REQUEST_CODE);
        }
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);

        } else {
            getCurrentLocation();
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED
                    || ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_MEDIA_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.CAMERA, android.Manifest.permission.ACCESS_MEDIA_LOCATION}, LOCATION_PERMISSION_REQUEST_CODE);

            }
        } else {
            if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.CAMERA}, LOCATION_PERMISSION_REQUEST_CODE);
            }
        }

        button_map = findViewById(R.id.button_map);
        mapView = findViewById(R.id.openmap);
        button_map.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setContentView(R.layout.openmap_layout);

                mapView = findViewById(R.id.openmap);

                AnnotationPlugin annotationPlugin = AnnotationPluginImplKt.getAnnotations(mapView);
                PointAnnotationManager pointAnnotationManagerKt = PointAnnotationManagerKt.createPointAnnotationManager(annotationPlugin, new AnnotationConfig());

                Bitmap iconBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.custom_marker);

                PointAnnotationOptions pointAnnotationOptions = new PointAnnotationOptions()
                        .withPoint(Point.fromLngLat(-74.035036, 40.747997))
                        .withIconImage(iconBitmap);


                pointAnnotationManagerKt.create(pointAnnotationOptions);

            }
        });





        updatePosition(currentLatitude, currentLongitude);
        System.out.println(currentLatitude + currentLongitude);
        search = findViewById(R.id.search);
        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToSecondLayout();
            }
        });




        LayoutInflater inflater = LayoutInflater.from(this);
        afterPhotoLayout = inflater.inflate(R.layout.input_layout, null);
        //insertInt = inflater.inflate(R.layout.input_integer,null);

        btnCamera = findViewById(R.id.button_camera);
        gallery_button = findViewById(R.id.gallery);


       // setContentView(R.layout.input_integer);


        gallery_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                OpenGallery();
            }
        });

        cameraLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK) {

                            Bundle extras = result.getData().getExtras();
                            Bitmap imageBitmap = (Bitmap) extras.get("data");
                            File file = new File(getExternalCacheDir(),  "image.jpg");


                            try {
                                // Compress the bitmap to the file
                                file.createNewFile();
                                FileOutputStream outputStream = new FileOutputStream(file);
                                imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream);
                                outputStream.flush();
                                outputStream.close();
                                isPhotoTaken= true;
                                setContentView(R.layout.activity_main);

                                if(isPhotoTaken){
                                    setContentView(R.layout.add_or_new_layout);
                                    newButton = findViewById(R.id.newButton);
                                    addButton = findViewById(R.id.addButton);

                                    try {
                                        newButton.setOnClickListener(new View.OnClickListener() {
                                            @Override
                                            public void onClick(View view) {
                                                setContentView(R.layout.input_layout);
                                                submitButton = findViewById(R.id.submitButton);
                                                name = findViewById(R.id.variable1EditText);
                                                description = findViewById(R.id.variable2EditText);
                                                try {

                                                    submitButton.setOnClickListener(new View.OnClickListener() {

                                                        @Override
                                                        public void onClick(View view) {
                                                            photo_name = name.getText().toString();
                                                            photo_description = description.getText().toString();
                                                            String new_filename = photo_name + ".jpg";
                                                            File new_file = new File(file.getParent(), new_filename);
                                                            file.renameTo(new_file);
                                                            NetworkTask networkTask = new NetworkTask(new_file,photo_name,photo_description, currentLatitude,currentLongitude);
                                                            networkTask.execute();
                                                            switchToMainLayout();

                                                        }

                                                    });

                                                } catch (Exception e) {
                                                    e.printStackTrace();
                                                }
                                            }
                                        });
                                    }catch (Exception e) {
                                        e.printStackTrace();
                                    }


                                       try {
                                           addButton.setOnClickListener(new View.OnClickListener() {
                                               @Override
                                               public void onClick(View view) {
                                                   setContentView(R.layout.input_layout_2);
                                                   MakeGetRequest_menu();
                                                   submitButton = findViewById(R.id.submitButton);
                                                   name1 = findViewById(R.id.name_photo);

                                                   try {

                                                       submitButton.setOnClickListener(new View.OnClickListener() {

                                                           @Override
                                                           public void onClick(View view) {
                                                               int selectedCollection = spinner.getSelectedItemPosition();
                                                               String id_collection = collectionID.get(selectedCollection);
                                                               photo_name1 = name1.getText().toString();
                                                               String new_filename = photo_name1 + ".jpg";
                                                               File new_file = new File(file.getParent(), new_filename);
                                                               file.renameTo(new_file);
                                                               NetworkTask_1 networkTask = new NetworkTask_1(new_file,id_collection, currentLatitude, currentLongitude);
                                                               networkTask.execute();
                                                               switchToMainLayout();

                                                           }

                                                       });

                                                   } catch (Exception e) {
                                                       e.printStackTrace();
                                                   }
                                               }
                                           });
                                       }catch (Exception e){
                                           e.printStackTrace();
                                       }

                                }

                                // Use the file object as needed
                            } catch (IOException e) {
                                e.printStackTrace();
                                // Handle the exception
                            }



                        // The photo was taken successfully
                        // You can access the captured image using result.getData()

                    } else {
                        // Handle the case when the camera activity was canceled or failed
                        Toast.makeText(this, "Camera capture canceled or failed", Toast.LENGTH_SHORT).show();
                    }
                });

        btnCamera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isCameraAvailable()) {
                    dispatchTakePictureIntent();
                    getCurrentLocation();
                    updatePosition(currentLatitude, currentLongitude);
                } else {
                    Toast.makeText(MainActivity.this, "No camera app found", Toast.LENGTH_SHORT).show();
                }
            }
        });
}

    private boolean isCameraAvailable() {
        PackageManager packageManager = getPackageManager();
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        return cameraIntent.resolveActivity(packageManager) != null;
    }

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        cameraLauncher.launch(takePictureIntent);
    }



    private void getCurrentLocation() {
        // Check if location permissions are granted
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            // Get the last known location
            LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            Location lastKnownLocation = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

            if (lastKnownLocation != null) {
                updatePosition(lastKnownLocation.getLatitude(), lastKnownLocation.getLongitude());
                Log.d("MainActivity", "Latitude: " + currentLatitude);
                Log.d("MainActivity", "Longitude: " + currentLongitude);
            } else {
                Log.d("MainActivity", "Last known location is null");
            }
        } else {
            Log.d("MainActivity", "Location permission not granted");
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getCurrentLocation();
            } else {
                Log.d("MainActivity", "Location permission denied");
            }
        }
    }

}