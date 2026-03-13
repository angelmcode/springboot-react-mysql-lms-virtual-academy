package com.angel.virtual_academy.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class signup {
    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        // This prints the ENTIRE object received from React
        System.out.println("Full Data received: " + data);

        // If you want to see them one by one for clarity:
        System.out.println("Name: " + data.get("name"));
        System.out.println("Email: " + data.get("email"));
        System.out.println("Username: " + data.get("username"));
        System.out.println("Password: " + data.get("password"));

        return ResponseEntity.ok(Map.of("status", "success", "message", "User received!"));
    }
}
