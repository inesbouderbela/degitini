package com.digitini.user;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Component
@Slf4j
public class JwtTokenProvider {
    
    private final SecretKey accessTokenKey;
    private final SecretKey refreshTokenKey;
    private final Long accessTokenExpiration;
    private final Long refreshTokenExpiration;
    private final ConcurrentHashMap<String, String> refreshTokenStore = new ConcurrentHashMap<>();
    
    public JwtTokenProvider(
            @Value("${jwt.secret:defaultSecretKeyForDevelopmentChangeInProduction}") String secret,
            @Value("${jwt.access-token.expiration:3600000}") Long accessTokenExpiration, // 1 hour in milliseconds
            @Value("${jwt.refresh-token.expiration:604800000}") Long refreshTokenExpiration) { // 7 days in milliseconds
        this.accessTokenKey = Keys.hmacShaKeyFor((secret + "-access").getBytes());
        this.refreshTokenKey = Keys.hmacShaKeyFor((secret + "-refresh").getBytes());
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
        log.info("JWT Token Provider initialized with access expiration: {} ms, refresh expiration: {} ms", 
                 accessTokenExpiration, refreshTokenExpiration);
    }
    
    public String generateAccessToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(accessTokenExpiration);
        
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .claim("userId", user.getId())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .signWith(accessTokenKey)
                .compact();
    }
    
    public String generateRefreshToken(User user) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(refreshTokenExpiration);
        
        String refreshToken = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .signWith(refreshTokenKey)
                .compact();
        
        refreshTokenStore.put(refreshToken, user.getEmail());
        log.info("Generated refresh token for user: {}", user.getEmail());
        return refreshToken;
    }
    
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(accessTokenKey)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid access token: {}", e.getMessage());
            return false;
        }
    }
    
    public boolean validateRefreshToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(refreshTokenKey) // Use refreshTokenKey here
                .build()
                .parseClaimsJws(token)
                .getBody();
            
            // Check if token exists in store and is not expired
            boolean isValid = refreshTokenStore.containsKey(token);
            if (isValid) {
                log.debug("Refresh token validated for user: {}", claims.getSubject());
            } else {
                log.warn("Refresh token not found in store: {}", token);
            }
            return isValid;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid refresh token: {}", e.getMessage());
            return false;
        }
    }
    
    public String getEmailFromRefreshToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(refreshTokenKey) // Use refreshTokenKey here
                .build()
                .parseClaimsJws(token)
                .getBody();
            return claims.getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Failed to get email from refresh token: {}", e.getMessage());
            return null;
        }
    }
    
    public Authentication getAuthentication(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(accessTokenKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            
            String email = claims.getSubject();
            String role = claims.get("role", String.class);
            
            List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_" + role)
            );
            
            return new UsernamePasswordAuthenticationToken(email, null, authorities);
        } catch (JwtException e) {
            log.error("Failed to get authentication from token: {}", e.getMessage());
            throw e;
        }
    }
    
    public Long getAccessTokenExpiration() {
        return accessTokenExpiration;
    }
    
    public void invalidateRefreshToken(String token) {
        String email = refreshTokenStore.remove(token);
        if (email != null) {
            log.info("Invalidated refresh token for user: {}", email);
        }
    }
    
    // New method to get user from refresh token
    public String getUserEmailFromRefreshToken(String token) {
        return refreshTokenStore.get(token);
    }
}