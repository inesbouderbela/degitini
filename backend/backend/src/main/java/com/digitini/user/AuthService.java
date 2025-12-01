package com.digitini.user;

import org.springframework.security.core.Authentication;

public interface AuthService {
    AuthResponse authenticate(AuthRequest request);
    AuthResponse refreshToken(String refreshToken);
    void logout(String refreshToken);
    boolean validateToken(String token);
    Authentication getAuthentication(String token);
}