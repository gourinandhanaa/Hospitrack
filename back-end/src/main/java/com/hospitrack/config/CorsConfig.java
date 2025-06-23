package com.hospitrack.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Enable CORS for all endpoints under /api/*
                registry.addMapping("/**") // Apply to all endpoints
                    .allowedOrigins("http://localhost:3000") // Allow only from the frontend (React app)
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                    .allowedHeaders("*") // Allow all headers
                    .allowCredentials(true) // Allow credentials (cookies, etc.)
                    .maxAge(3600); // Cache the CORS response for 1 hour
            }
        };
    }
}

