package com.angel.virtual_academy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class securityconfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Required for React POST requests later
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/hello", "/api/auth/register").permitAll() // Open this for the test
                        .anyRequest().authenticated()             // Lock everything else
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
