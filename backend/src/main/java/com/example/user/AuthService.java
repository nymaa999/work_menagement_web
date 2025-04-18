package com.example.user;   

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse register(RegisterRequest request) {
        // Check if email is already registered
        Optional<Users> existing = userRepository.findByEmail(request.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already in use!");
        }

        // Create user
        Users newUser = new Users(request.getName(), request.getEmail(), request.getPassword());
        System.out.println("===== REGISTER METHOD CALLED =====");
        System.out.println("Registering user: " + newUser.getUsername() + ", " + newUser.getEmail());
        userRepository.save(newUser);

        return new UserResponse(newUser.getUsername(), newUser.getEmail());
    }

    public UserResponse login(LoginRequest request) {
        Optional<Users> user = userRepository.findByEmail(request.getEmail());

        // Check if the user exists and if the password matches
        if (user.isEmpty() || !user.get().getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid email or password!");
        }

        // Return the user response
        return new UserResponse(user.get().getUsername(), user.get().getEmail());
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
}
