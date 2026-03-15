package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // JpaRepository gives you .save(), .findAll(), .findById(), etc.
}