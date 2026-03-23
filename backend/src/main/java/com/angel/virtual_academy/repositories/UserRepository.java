package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository gives you .save(), .findAll(), .findById(), etc.
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);
    Optional<User> findByEmailOrUsername(String email, String username);
}