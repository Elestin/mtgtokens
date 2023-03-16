package com.example.mtgtoken;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface ScryfallApi {

    @GET("cards/search")
    Call<TokenSearchResponse> searchTokens(@Query("q") String query);
}
