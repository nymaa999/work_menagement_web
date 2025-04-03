package com.example.demo;


import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegisterRequest request) {
        Optional<Users> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already in use!");
        }

        Users user = new Users();
        user.setUsername(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Нууц үг шифрлэх

        userRepository.save(user);
    }

    public boolean authenticate(LoginRequest request) {
        Optional<Users> optionalUser = userRepository.findByEmail(request.getEmail());
        return optionalUser.isPresent() && 
               passwordEncoder.matches(request.getPassword(), optionalUser.get().getPassword());
    }
}
