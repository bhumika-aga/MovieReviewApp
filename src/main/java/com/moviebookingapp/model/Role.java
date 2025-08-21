package com.moviebookingapp.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "roles")
@Data
public class Role {
    
    @Id
    private String roleId;
    private UserRole role;
    
    public Role() {
    }
    
    public Role(UserRole role) {
        this.role = role;
    }
    
    public Role(String roleId, UserRole role) {
        super();
        this.roleId = roleId;
        this.role = role;
    }
    
    public String getRoleId() {
        return roleId;
    }
    
    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
    
    public UserRole getRole() {
        return role;
    }
    
    public void setRole(UserRole role) {
        this.role = role;
    }
}