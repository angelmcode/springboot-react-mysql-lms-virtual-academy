package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.RefreshToken;
import com.angel.virtual_academy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    // Custom delete methods for our "Kill Switch"
    void deleteByUser(User user);
    void deleteByToken(String token);
}