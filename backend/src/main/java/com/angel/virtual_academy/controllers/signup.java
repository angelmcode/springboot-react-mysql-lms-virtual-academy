package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class signup {

    private final UserRepository userRepository;

    public signup(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        String email = data.get("email");
        String username = data.get("username");

        // 1. Check if Email already exists
        if (userRepository.existsByEmail(email)) {
            // Add "field", "email" to the Map!
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("field", "email", "message", "This email is already registered."));
        }

        // 2. Check if Username already exists
        if (userRepository.existsByUsername(username)) {
            // Add "field", "username" to the Map!
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("field", "username", "message", "This username is already taken."));
        }

        // 3. If both checks pass, create the User
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(data.get("password"));
        user.setFirstName(data.get("name"));

        // 4. SAVE to the database
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("status", "success", "message", "User saved to DB!"));
    }
}