package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    // Find a permission by its name (e.g., "ACCESS_STUDENT_PANEL")
    Optional<Permission> findByName(String name);
}