package com.multicore.crm.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.multicore.crm.entity.User;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtUtil {

    @Value("${jwt.secret:mySecretKeyForJwtTokenGenerationAndValidationPurpose12345}")
    private String jwtSecret;

    @Value("${jwt.expiration:3600000}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Generate JWT token with all necessary claims for multi-tenant SaaS
     */
    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("email", user.getEmail());
        claims.put("fullName", user.getFullName());
        
        // Add businessId (null for ADMIN & standalone CUSTOMER users)
        if (user.getBusiness() != null) {
            claims.put("businessId", user.getBusiness().getId());
            claims.put("tenantId", user.getBusiness().getId());
        } else {
            claims.put("businessId", null);
            claims.put("tenantId", null);
        }
        
        // Add roles as list of role names
        String primaryRole = user.getRoles().stream()
                .map(role -> role.getRoleName().toString())
                .collect(Collectors.joining(","));
        claims.put("roles", primaryRole);

        return createToken(claims, user.getEmail());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Long extractUserId(String token) {
        return extractClaim(token, claims -> {
            Object userId = claims.get("userId");
            return userId != null ? ((Number) userId).longValue() : null;
        });
    }

    public Long extractBusinessId(String token) {
        return extractClaim(token, claims -> {
            Object businessId = claims.get("businessId");
            return businessId != null ? ((Number) businessId).longValue() : null;
        });
    }

    public String extractRoles(String token) {
        return extractClaim(token, claims -> (String) claims.get("roles"));
    }

    public <T> T extractClaim(String token, java.util.function.Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error("JWT validation failed: " + e.getMessage());
            return false;
        }
    }
}