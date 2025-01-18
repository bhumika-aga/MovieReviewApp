package com.moviebookingapp.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.moviebookingapp.service.impl.UserDetailsImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtUtils {

	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

	@Value("${moviebookingapp.app.jwtSecret}")
	private String jwtSecret;

	@Value("${moviebookingapp.app.jwtExpirationMs}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

		return Jwts.builder().subject(userPrincipal.getUsername()).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + jwtExpirationMs)).signWith(key).compact();
	}

	private Claims getClaims(String token) {
		SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
		return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
	}

	public String getUsernameFromToken(String token) {
		return getClaims(token).getSubject();
	}

	public boolean validateJwtToken(String token) {
		try {
			getClaims(token);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("Unsupported JWT token: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("Empty JWT Claims String: {}", e.getMessage());
		}
		return false;
	}
}