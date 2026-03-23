package com.angel.virtual_academy.security;

import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.repositories.UserRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class PermissionCacheService {
    private final UserRepository userRepository;

    public PermissionCacheService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "userPermissions", key = "#username")
    public List<SimpleGrantedAuthority> getAuthoritiesForUser(String username) {
        // This print will only show once per user!
        System.out.println("CACHE MISS! Fetching from DB for: " + username);

        User user = userRepository.findByEmailOrUsername(username, username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getUserRoles().forEach(ur -> {
            authorities.add(new SimpleGrantedAuthority(ur.getRole().getName()));
            ur.getRole().getRolePermissions().forEach(rp -> {
                if (rp.isActive()) {
                    authorities.add(new SimpleGrantedAuthority(rp.getPermission().getName()));
                }
            });
        });
        return authorities;
    }
}