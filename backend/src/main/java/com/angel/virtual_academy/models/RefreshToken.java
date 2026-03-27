package com.angel.virtual_academy.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // Allows 1 user to have multiple tokens (Phone, Laptop, etc.)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(name = "expiry_date", nullable = false)
    private Instant expiryDate;

    // Updatable=false ensures Hibernate never tries to overwrite your DB's default timestamp
    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private Instant createdAt;
}