package com.example.phototmanager;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;
import java.util.ArrayList;

public class CustomAdapter extends ArrayAdapter<ListItem> {
    private Context context;
    private ArrayList<ListItem> items;

    public CustomAdapter(Context context, ArrayList<ListItem> items) {
        super(context, 0, items);
        this.context = context;
        this.items = items;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ListItem item = getItem(position);

        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.list_item, parent, false);
        }

        ImageView imageView = convertView.findViewById(R.id.imageView);
        TextView textView = convertView.findViewById(R.id.textView);

        // Set the text
        textView.setText(item.getText());

        // Load the image from URI using Picasso (or any other image loading library)
        Picasso.get().load(item.getImageUri()).into(imageView);

        return convertView;
    }
}
