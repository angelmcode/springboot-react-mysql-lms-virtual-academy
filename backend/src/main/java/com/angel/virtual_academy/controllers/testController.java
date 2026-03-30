package com.angel.virtual_academy.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {

    // 1. PUBLIC DOOR: No token needed
    @GetMapping("/public")
    public ResponseEntity<String> publicAccess() {
        return ResponseEntity.ok("Public content. Anyone can see this!");
    }

    // 2. STUDENT DOOR: Only tokens with ROLE_STUDENT get in
    @GetMapping("/student")
    @PreAuthorize("hasAuthority('ACCESS_STUDENT_PANEL')")
    public ResponseEntity<String> studentAccess() {
        return ResponseEntity.ok("Backend Success! The vault confirmed you are a STUDENT. 🎓");
    }

    // 3. TEACHER/ADMIN DOOR: Only TEACHER or ADMIN tokens get in
    @GetMapping("/teacher")
    @PreAuthorize("hasAnyAuthority('ACCESS_TEACHER_PANEL')")
    public ResponseEntity<String> teacherAccess() {
        return ResponseEntity.ok("Backend Success! The vault confirmed you are a TEACHER/ADMIN. 👨‍🏫");
    }
}