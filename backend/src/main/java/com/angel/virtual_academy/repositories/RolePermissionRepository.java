package com.angel.virtual_academy.repositories;

import com.angel.virtual_academy.models.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {

    // Get all permission mappings for a specific Role ID
    List<RolePermission> findByRoleId(Long roleId);

    // Useful for checking if a role already has a specific permission
    boolean existsByRoleIdAndPermissionId(Long roleId, Long permissionId);
}