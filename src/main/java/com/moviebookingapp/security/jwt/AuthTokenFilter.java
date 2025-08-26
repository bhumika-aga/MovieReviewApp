package com.moviebookingapp.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.moviebookingapp.service.impl.UserDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String requestURI = request.getRequestURI();
            String method = request.getMethod();
            logger.info("Processing request: {} {}", method, requestURI);

            String jwt = parseJwt(request);
            logger.info("JWT Token extracted: {}", jwt != null ? "Present (length: " + jwt.length() + ")" : "Null");

            if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
                String username = jwtUtils.getUsernameFromToken(jwt);
                logger.info("JWT validated successfully for user: {}", username);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
                logger.info("Authentication set for user: {} with authorities: {}", username,
                        userDetails.getAuthorities());
            } else {
                logger.warn("JWT validation failed or token is null for request: {} {}", method, requestURI);
                if (jwt != null) {
                    logger.warn("Token validation failed. Token starts with: {}",
                            jwt.substring(0, Math.min(20, jwt.length())) + "...");
                }
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication for request {} {}: {}", request.getMethod(),
                    request.getRequestURI(), e.getMessage(), e);
        }
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}