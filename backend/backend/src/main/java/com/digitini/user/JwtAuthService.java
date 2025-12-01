package com.digitini.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtAuthService implements AuthService {
    
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;
    private final UserMapper userMapper; // Inject the mapper
    
    @Override
    public AuthResponse authenticate(AuthRequest request) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        
        String accessToken = jwtTokenProvider.generateAccessToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        UserDto userDto = userMapper.toDto(user); // Use injected mapper
        return new AuthResponse(accessToken, refreshToken, jwtTokenProvider.getAccessTokenExpiration(), userDto);
    }
    
    @Override
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateRefreshToken(refreshToken)) {
            throw new SecurityException("Invalid refresh token");
        }
        
        String email = jwtTokenProvider.getEmailFromRefreshToken(refreshToken);
        User user = userService.findByEmail(email)
                .orElseThrow(() -> new SecurityException("User not found"));
        
        String newAccessToken = jwtTokenProvider.generateAccessToken(user);
        String newRefreshToken = jwtTokenProvider.generateRefreshToken(user);
        
        UserDto userDto = userMapper.toDto(user); // Use injected mapper
        return new AuthResponse(newAccessToken, newRefreshToken, jwtTokenProvider.getAccessTokenExpiration(), userDto);
    }
    
    @Override
    public void logout(String refreshToken) {
        jwtTokenProvider.invalidateRefreshToken(refreshToken);
    }
    
    @Override
    public boolean validateToken(String token) {
        return jwtTokenProvider.validateAccessToken(token);
    }
    
    @Override
    public Authentication getAuthentication(String token) {
        return jwtTokenProvider.getAuthentication(token);
    }
}