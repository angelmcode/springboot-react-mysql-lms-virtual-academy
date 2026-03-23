package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // Spring Data JPA reads this method name and automatically writes the SQL:
    // SELECT * FROM roles WHERE name = ?
    Optional<Role> findByName(String name);
}