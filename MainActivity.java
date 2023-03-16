package com.example.mtgtoken;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;
import android.os.Bundle;
import android.widget.SearchView;
import android.widget.Toast;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class MainActivity extends AppCompatActivity {
    private RecyclerView recyclerView;
    private TokenAdapter tokenAdapter;
    private SearchView searchView;
    private ScryfallApi scryfallApi;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recyclerView);
        searchView = findViewById(R.id.searchView);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.scryfall.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        scryfallApi = retrofit.create(ScryfallApi.class);

        tokenAdapter = new TokenAdapter(new ArrayList<Token>(), this);
        recyclerView.setAdapter(tokenAdapter);

        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                searchTokens(query);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                return false;
            }
        });
    }

    private void searchTokens(String query) {
        scryfallApi.searchTokens("t:token " + query).enqueue(new Callback<TokenSearchResponse>() {
            @Override
            public void onResponse(Call<TokenSearchResponse> call, Response<TokenSearchResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Token> tokens = response.body().getTokens();
                    tokenAdapter = new TokenAdapter(tokens, MainActivity.this);
                    recyclerView.setAdapter(tokenAdapter);
                } else {
                    Toast.makeText(MainActivity.this, "Error: " + response.message(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<TokenSearchResponse> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}
