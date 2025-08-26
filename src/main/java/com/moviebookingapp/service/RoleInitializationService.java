package com.moviebookingapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import com.moviebookingapp.model.Role;
import com.moviebookingapp.model.UserRole;
import com.moviebookingapp.repository.RoleRepository;

@Service
@Order(1)
public class RoleInitializationService implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🔐 ReelCritic Role Initialization Starting...");
        try {
            initializeRoles();
            System.out.println("✅ ReelCritic roles initialized successfully!");
        } catch (Exception e) {
            System.err.println("⚠️  Warning: Could not initialize roles.");
            System.err.println("Error: " + e.getMessage());
        }
    }

    private void initializeRoles() {
        // Initialize USER role
        if (roleRepository.findByRole(UserRole.USER).isEmpty()) {
            Role userRole = new Role(UserRole.USER);
            roleRepository.save(userRole);
            System.out.println("📝 Created USER role");
        }

        // Initialize ADMIN role
        if (roleRepository.findByRole(UserRole.ADMIN).isEmpty()) {
            Role adminRole = new Role(UserRole.ADMIN);
            roleRepository.save(adminRole);
            System.out.println("📝 Created ADMIN role");
        }

        // Initialize GUEST role
        if (roleRepository.findByRole(UserRole.GUEST).isEmpty()) {
            Role guestRole = new Role(UserRole.GUEST);
            roleRepository.save(guestRole);
            System.out.println("📝 Created GUEST role");
        }

        System.out.println("🔐 All roles are available in the database");
    }
}