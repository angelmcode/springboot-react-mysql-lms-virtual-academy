package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.dto.LoginRequest;
import com.angel.virtual_academy.dto.LoginResponse;
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.security.JwtUtils;
import com.angel.virtual_academy.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;

    public LoginController(AuthService authService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        User user = authService.authenticate(request.getIdentifier(), request.getPassword());

        // 1. Generate a TINY token (No permissions inside)
        String token = jwtUtils.generateJwtToken(user.getUsername());

        // 2. Get roles only for the Frontend UI
        List<String> roles = user.getUserRoles().stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList());

        // 4. Return the response with the list of roles
        LoginResponse response = new LoginResponse(
                "success",
                "Welcome back, " + user.getUsername() + "!",
                token,
                user.getUsername(),
                roles // Now sending the full list ["ROLE_TEACHER", "ROLE_STUDENT"]
        );

        return ResponseEntity.ok(response);
    }
}