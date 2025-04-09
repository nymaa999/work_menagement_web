package com.example.demo;

import org.bson.types.ObjectId;


public class UserResponse {
    private ObjectId id;
    private String name;
    private String email;
    
    public UserResponse() {
    }

    public UserResponse(String username, String email2) {
        this.name = username;
        this.email = email2;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public Object getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id = id;
    }
}

