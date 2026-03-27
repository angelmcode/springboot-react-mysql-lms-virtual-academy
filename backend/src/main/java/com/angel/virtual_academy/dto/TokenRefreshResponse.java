// File: src/main/java/com/angel/virtual_academy/dto/TokenRefreshResponse.java
package com.angel.virtual_academy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRefreshResponse {
    private String accessToken;
    private String tokenType = "Bearer";

    public TokenRefreshResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}