package com.angel.virtual_academy.controllers;

import com.angel.virtual_academy.dto.LoginRequest;
import com.angel.virtual_academy.dto.LoginResponse;
import com.angel.virtual_academy.dto.TokenRefreshResponse;
import com.angel.virtual_academy.models.RefreshToken;
import com.angel.virtual_academy.models.User;
import com.angel.virtual_academy.security.JwtUtils;
import com.angel.virtual_academy.services.AuthService;
import com.angel.virtual_academy.services.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;
    // NEW: We inject our new Refresh Token Service
    private final RefreshTokenService refreshTokenService;

    public LoginController(AuthService authService, JwtUtils jwtUtils, RefreshTokenService refreshTokenService) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        User user = authService.authenticate(request.getIdentifier(), request.getPassword());

        // 1. Generate the fast, short-lived Access Token (5 mins)
        String jwt = jwtUtils.generateJwtToken(user.getUsername());

        // 2. NEW: Generate the secure, long-lived Refresh Token in the Database (7 days)
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);

        // 3. NEW: Package the Refresh Token into a secure, HttpOnly Cookie
        ResponseCookie resCookie = ResponseCookie.from("refreshToken", refreshToken.getToken())
                .httpOnly(true)
                .secure(false) // Set to 'true' later when you use HTTPS
                .path("/api/auth") // The browser ONLY sends this cookie when asking for a refresh
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .sameSite("Lax")
                .build();

        // Attach the cookie to the HTTP response headers
        response.addHeader(HttpHeaders.SET_COOKIE, resCookie.toString());

        // 4. Return the standard info to the frontend (Same as before)
        List<String> roles = user.getUserRoles().stream()
                .map(ur -> ur.getRole().getName())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new LoginResponse(
                "success", "Welcome back, " + user.getUsername() + "!", jwt, user.getUsername(), roles
        ));
    }

    // NEW ENDPOINT: The "Repair Shop" for expired Access Tokens
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        // 1. Extract the cookie from the incoming request safely
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");

        if (cookie == null) {
            return ResponseEntity.status(401).body("Refresh Token is missing. Please log in.");
        }

        String requestRefreshToken = cookie.getValue();

        // 2. Verify the token in the DB and generate a new Access Token
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String newToken = jwtUtils.generateJwtToken(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(newToken));
                })
                .orElseThrow(() -> new RuntimeException("Refresh token is not in database! (It may have been revoked)"));
    }

    // NEW ENDPOINT: The "Kill Switch" to safely log users out
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");
        if (cookie != null) {
            // Delete it from the database so a hacker can't use it
            refreshTokenService.deleteByToken(cookie.getValue());
        }

        // Clear the cookie in the user's browser by setting maxAge to 0
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