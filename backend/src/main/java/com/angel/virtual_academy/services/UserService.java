package com.angel.virtual_academy.services;

import com.angel.virtual_academy.exceptions.EmailAlreadyExistsException;
import com.angel.virtual_academy.exceptions.UsernameAlreadyExistsException;
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(Map<String, String> data) {
        String email = data.get("email");
        String username = data.get("username");

        // Logic Check 1: Email
        if (userRepository.existsByEmail(email)) {
            // USE THE SPECIFIC CLASS, NOT RUNTIMEEXCEPTION
            throw new EmailAlreadyExistsException("This email is already registered.");
        }

        // Logic Check 2: Username
        if (userRepository.existsByUsername(username)) {
            // USE THE SPECIFIC CLASS
            throw new UsernameAlreadyExistsException("This username is already taken.");
        }

        // Logic: Mapping and creating the User object
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(data.get("password")); // Note: In the future, we will encrypt this here!
        user.setFirstName(data.get("name"));

        // Save and return
        return userRepository.save(user);
    }
}