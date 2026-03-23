package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.dto.SignupRequest; // 1. Import your new DTO!
import com.angel.virtual_academy.dto.SignupResponse;
import com.angel.virtual_academy.services.AuthService;
import com.angel.virtual_academy.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class SignupController {

    private final AuthService authService;

    public SignupController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<SignupResponse> register(@RequestBody SignupRequest request) {
        User user = authService.processRegistration(request);

        SignupResponse response = new SignupResponse(
                "success",
                "User registered successfully!",
                user.getId(),
                user.getUsername()
        );

        return ResponseEntity.ok(response);
    }
}