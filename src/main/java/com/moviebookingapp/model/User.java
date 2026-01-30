package com.moviebookingapp.model;

import java.util.HashSet;
import java.util.Set;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Document(value = "user")
@Data
public class User {

    @Id
    private ObjectId userId;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8)
    private String password;

    @NotNull
    private Long contactNumber;

    @DBRef
    private Set<Role> role = new HashSet<>();

    public User() {
    }

    public User(@NotBlank @Size(max = 20) String username, @NotBlank String firstName, @NotBlank String lastName,
            @NotBlank @Size(max = 50) @Email String email, @NotBlank @Size(min = 8) String password, Long contactNumber,
            Set<Role> role) {
        super();
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.role = role;
    }

    public User(String username, String firstName, String lastName, String email, Long contactNumber, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.password = password;
    }

    public User(ObjectId userId, @NotBlank @Size(max = 20) String username, @NotBlank String firstName,
            @NotBlank String lastName, @NotBlank @Size(max = 50) @Email String email,
            @NotBlank @Size(min = 8) String password, @NotNull Long contactNumber, Set<Role> role) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contactNumber = contactNumber;
        this.role = role;
    }

    public ObjectId getUserId() {
        return userId;
    }

    public void setUserId(ObjectId userId) {
        this.userId = userId;
    }
}