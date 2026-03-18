package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.services.UserService;
import com.angel.virtual_academy.models.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class signup {

    private final UserService userService;

    public signup(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        // No try-catch needed!
        // If userService throws an exception, the GlobalExceptionHandler takes over.
        User user = userService.registerUser(data);

        return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "User saved to DB!",
                "userId", user.getId()
        ));
    }
}