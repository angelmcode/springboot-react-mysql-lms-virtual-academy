package com.angel.virtual_academy.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Catch the specific Email error
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<?> handleEmailError(EmailAlreadyExistsException e) {
        return ResponseEntity.badRequest().body(Map.of(
                "field", "email",
                "message", e.getMessage()
        ));
    }

    // Catch the specific Username error
    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<?> handleUsernameError(UsernameAlreadyExistsException e) {
        return ResponseEntity.badRequest().body(Map.of(
                "field", "username",
                "message", e.getMessage()
        ));
    }
}