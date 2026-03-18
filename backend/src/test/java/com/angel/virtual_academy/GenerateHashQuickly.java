package com.angel.virtual_academy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GenerateHashQuickly {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // Put the password you want for your admin here
        String myPassword = "admin1234";

        String theHash = encoder.encode(myPassword);
        System.out.println("Your Hash is: " + theHash);
    }
}