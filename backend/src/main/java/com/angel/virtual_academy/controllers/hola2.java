package com.angel.virtual_academy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class hola2 {

    @GetMapping("/hello2")
    public String sayhello(){
        return "hi2 hello2";
    }
}
