package com.moviebookingapp.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.moviebookingapp.model.Role;
import com.moviebookingapp.model.UserRole;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

    Optional<Role> findByRole(UserRole role);
}