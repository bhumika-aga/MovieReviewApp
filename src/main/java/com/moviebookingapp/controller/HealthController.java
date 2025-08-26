package com.moviebookingapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class HealthController {

    @Value("${spring.application.name:ReelCritic}")
    private String applicationName;

    @GetMapping
    @Operation(summary = "Application status and information")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("application", applicationName);
        status.put("status", "UP");
        status.put("version", "1.0.0");
        status.put("description", "ReelCritic - The Premium Movie Review Platform");
        status.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        status.put("message", "🎬 ReelCritic is running successfully!");
        
        return ResponseEntity.ok(status);
    }
}