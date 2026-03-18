package com.angel.virtual_academy.models;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_roles",
        uniqueConstraints = {
                @UniqueConstraint(name = "u1_user_role", columnNames = {"user_id", "role_id"}) // Added unique constraint
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links to the User table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Links to the Role table
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    // Relies on DB DEFAULT CURRENT_TIMESTAMP
    @Column(name = "granted_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime grantedAt;

    @Column(name = "granted_by", length = 100, nullable = false)
    private String grantedBy;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}