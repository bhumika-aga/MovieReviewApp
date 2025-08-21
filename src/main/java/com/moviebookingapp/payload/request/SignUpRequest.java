package com.moviebookingapp.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;

@Data
public class SignUpRequest {
    
    @NotBlank
    @Size(min = 3, max = 20)
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
    private Long contactNumber;
    
    @NotBlank
    @Size(min = 8, max = 20)
    private String password;
    
    private Set<String> role;
    
    public SignUpRequest(@NotBlank @Size(min = 3, max = 20) String username, @NotBlank String firstName,
                         @NotBlank String lastName, @NotBlank @Size(max = 50) @Email String email, @NotBlank Long contactNumber,
                         @NotBlank @Size(min = 8, max = 20) String password, Set<String> role) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.password = password;
        this.role = role;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Long getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(Long contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
        return role;
    }
    
    public void setRole(Set<String> role) {
        this.role = role;
    }
}