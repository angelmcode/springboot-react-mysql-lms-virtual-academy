package com.angel.virtual_academy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignupResponse {
    private String status;
    private String message;
    private Long userId;
    private String username;
}