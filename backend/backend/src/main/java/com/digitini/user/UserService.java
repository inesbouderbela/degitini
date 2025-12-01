package com.digitini.user;

import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    
    User authenticate(String email, String password);
    
    User register(CreateUserRequest request);
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findById(Long id);
    
    User updateUser(Long id, UserDto userDto);
    
    void changePassword(Long userId, String oldPassword, String newPassword);
    
    boolean existsByEmail(String email);
    
    boolean existsByCin(String cin);
}