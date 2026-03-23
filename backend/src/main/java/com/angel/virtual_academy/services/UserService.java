package com.angel.virtual_academy.services;

import com.angel.virtual_academy.exceptions.EmailAlreadyExistsException;
import com.angel.virtual_academy.exceptions.UsernameAlreadyExistsException;
import com.angel.virtual_academy.models.Role;
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.models.UserRole;
import com.angel.virtual_academy.repositories.RoleRepository;
import com.angel.virtual_academy.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository; // 1. Inject the new repository

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User registerUser(String email, String username, String hashedPassword, String firstName) {

        // Logic Check 1: Email
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("This email is already registered.");
        }

        // Logic Check 2: Username
        if (userRepository.existsByUsername(username)) {
            throw new UsernameAlreadyExistsException("This username is already taken.");
        }

        // 2. Create the User object
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(hashedPassword); // Hashed by the AuthService!
        user.setFirstName(firstName);

        // 3. Fetch the default student role from the database
        Role studentRole = roleRepository.findByName("ROLE_STUDENT")
                .orElseThrow(() -> new RuntimeException("Critical Error: Default role ROLE_STUDENT not found in database."));

        // 4. Create the join-table mapping object
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(studentRole);
        userRole.setGrantedBy("SYSTEM_SIGNUP"); // Perfect for auditing who gave the role!
        // Note: isActive and grantedAt are handled automatically by your default values

        // 5. Attach the mapping to the User
        user.getUserRoles().add(userRole);

        // 6. Save the user (CascadeType.ALL will automatically save the userRole to the DB too!)
        return userRepository.save(user);
    }
}