package com.moviebookingapp.security;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.moviebookingapp.security.jwt.AuthEntryPointJwt;
import com.moviebookingapp.security.jwt.AuthTokenFilter;
import com.moviebookingapp.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfiguration {

	private UserDetailsServiceImpl userDetailsService = new UserDetailsServiceImpl();

	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	AuthTokenFilter authJwtTokenFilter() {
		return new AuthTokenFilter();
	}

	@Bean
	DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	AuthenticationManager authManager(AuthenticationConfiguration authConfig) throws Exception {
		return authConfig.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors(withDefaults()).csrf(csrf -> csrf.disable())
				.exceptionHandling(handling -> handling.authenticationEntryPoint(unauthorizedHandler))
				.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(requests -> requests.requestMatchers("/**", "/actuator/**").permitAll()
						.requestMatchers("/api/v1.0/moviebookingapp/**").permitAll().anyRequest().authenticated());
		http.authenticationProvider(authProvider());
		http.addFilterBefore(authJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}