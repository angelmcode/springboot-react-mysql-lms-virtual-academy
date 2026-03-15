package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class signup {

    // 1. Declare the repository
    private final UserRepository userRepository;

    // 2. Add this constructor so Spring can "give" it to the controller
    public signup(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> data) {
        // 3. Create the User object from the data map
        User user = new User();
        user.setEmail(data.get("email"));
        user.setUsername(data.get("username"));
        user.setPassword(data.get("password"));
        user.setFirstName(data.get("name"));

        // 4. SAVE to the database!
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("status", "success", "message", "User saved to DB!"));
    }
}
