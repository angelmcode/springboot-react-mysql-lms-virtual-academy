package com.angel.virtual_academy.services;

import com.angel.virtual_academy.dto.SignupRequest; // Added
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.repositories.UserRepository; // Added
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // UPDATED: Now uses SignupRequest DTO
    public User processRegistration(SignupRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        return userService.registerUser(
                request.getEmail(),
                request.getUsername(),
                hashedPassword,
                request.getFirstName()
        );
    }

    // Login Logic
    public User authenticate(String identifier, String rawPassword) {
        // 1. Find user by email OR username
        User user = userRepository.findByEmailOrUsername(identifier, identifier)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // 2. Compare raw password with hashed password
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}