package com.example.phototmanager.config;

public class AppConfig {
    private static final String baseApiIP = "192.168.1.51";
    private static final String port_dev = "9090";
    private static final String port_production = "80";
    public static final String baseApiUrl = baseApiIP + ":" + port_dev;
    public static final String BASE_URL_WITH_SCHEMA = "http://" + baseApiUrl; // Replace with your API base URL

    public  static final String COLLECTION_URL = BASE_URL_WITH_SCHEMA + "/api/collections";

    public static final String PHOTOS_PATH = "api/photos";

    public static final String PHOTO_URL = BASE_URL_WITH_SCHEMA + "/resources/";

    public static final String GET_ALL_PHOTOS = BASE_URL_WITH_SCHEMA +"/"+PHOTOS_PATH+"/all";

}
