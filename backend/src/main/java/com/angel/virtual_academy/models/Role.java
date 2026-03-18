package com.angel.virtual_academy.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name; // e.g., "ROLE_TEACHER", "ROLE_STUDENT", "ROLE_ADMIN"

    @Column(name = "display_name", nullable = false, length = 100)
    private String displayName; // e.g., "Teacher", "Student"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;
}