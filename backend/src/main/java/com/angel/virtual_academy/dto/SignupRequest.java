package com.angel.virtual_academy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    private String email;
    private String username;
    private String password;
    private String firstName;
}