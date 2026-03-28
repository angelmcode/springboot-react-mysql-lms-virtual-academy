package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.dto.LoginRequest;
import com.angel.virtual_academy.dto.LoginResponse;
import com.angel.virtual_academy.dto.TokenRefreshResponse;
import com.angel.virtual_academy.models.RefreshToken;
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.security.JwtUtils;
import com.angel.virtual_academy.security.PermissionCacheService;
import com.angel.virtual_academy.services.AuthService;
import com.angel.virtual_academy.services.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority; // 1. Added Import
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final PermissionCacheService permissionCacheService; // 2. Added to class fields

    // 3. Injected into constructor
    public LoginController(AuthService authService,
                           JwtUtils jwtUtils,
                           RefreshTokenService refreshTokenService,
                           PermissionCacheService permissionCacheService) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
        this.permissionCacheService = permissionCacheService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User user = authService.authenticate(request.getIdentifier(), request.getPassword());

        // 1. Generate the fast, short-lived Access Token (5 mins)
        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        // 2. Generate the secure, long-lived Refresh Token in the Database (7 days)
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        // 3. Package the Refresh Token into a secure, HttpOnly Cookie
        ResponseCookie resCookie = ResponseCookie.from("refreshToken", refreshToken.getToken())
                .httpOnly(true)
                .secure(false) // Set to 'true' later when you use HTTPS
                .path("/api/auth")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .sameSite("Lax")
                .build();

        // 4. THIS WAS MISSING: Attach the cookie to the HTTP response headers!
        response.addHeader(HttpHeaders.SET_COOKIE, resCookie.toString());

        // 5. Get Authorities from the Cache Service (Lowercase 'p')
        List<String> allAuthorities = permissionCacheService.getAuthoritiesForUser(user.getUsername())
                .stream()
                .map(SimpleGrantedAuthority::getAuthority)
                .toList();

        // 6. Separate Roles and Permissions for the frontend
        List<String> roles = allAuthorities.stream()
                .filter(auth -> auth.startsWith("ROLE_"))
                .toList();

        List<String> permissions = allAuthorities.stream()
                .filter(auth -> !auth.startsWith("ROLE_"))
                .toList();

        // 7. Return the updated DTO
        return ResponseEntity.ok(new LoginResponse(
                "success", "Welcome back, " + user.getUsername() + "!", jwt, user.getUsername(), roles, permissions
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");

        if (cookie == null) {
            return ResponseEntity.status(401).body("Refresh Token is missing. Please log in.");
        }

        String requestRefreshToken = cookie.getValue();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String newToken = jwtUtils.generateJwtToken(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(newToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database! (It may have been revoked)"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");
        if (cookie != null) {
            refreshTokenService.deleteByToken(cookie.getValue());
        }

        ResponseCookie cleanCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cleanCookie.toString());

        return ResponseEntity.ok("Successfully logged out.");
    }
}