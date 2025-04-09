package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")  // This tells MongoDB to store data in the "users" collection
public class Users {
    @Id
    private ObjectId id; // MongoDB uses 

    private String name;
    private String email;
    private String password; // Hash this before storing in production

    // Constructors
    public Users() {}

    public Users(String username, String email, String password) {
        this.name = username;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public Object getId() { return id; }
    public void setId(ObjectId id) { this.id = id; }
    public String getUsername() { return name; }
    public void setUsername(String username) { this.name = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}