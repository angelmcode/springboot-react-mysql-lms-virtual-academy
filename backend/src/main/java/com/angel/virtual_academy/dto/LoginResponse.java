package com.angel.virtual_academy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String status;
    private String message;
    private String token; // This is the VIP Pass!
    private String username;
    private List<String> roles;
}