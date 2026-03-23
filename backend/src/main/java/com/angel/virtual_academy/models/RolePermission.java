package com.angel.virtual_academy.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "role_permissions",
        uniqueConstraints = {@UniqueConstraint(name = "u1_role_permission", columnNames = {"role_id", "permission_id"})}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RolePermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "permission_id", nullable = false)
    private Permission permission;

    @Column(name = "granted_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime grantedAt;

    @Column(name = "granted_by", length = 100, nullable = false)
    private String grantedBy;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}