package com.angel.virtual_academy.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class hola {

    @GetMapping("/hello")
    public Map<String, String> sayhello() {
        // This returns {"text": "hi hello"}
        return Map.of("text", "hi hello");
    }
}
