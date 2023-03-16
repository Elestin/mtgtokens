package com.example.mtgtoken;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class TokenSearchResponse {
    @SerializedName("data")
    private List<Token> tokens;

    // Constructor
    public TokenSearchResponse(List<Token> tokens) {
        this.tokens = tokens;
    }

    // Getters and setters
    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }
}
