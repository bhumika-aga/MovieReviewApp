package com.moviebookingapp.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moviebookingapp.model.Role;
import com.moviebookingapp.model.User;
import com.moviebookingapp.model.UserRole;
import com.moviebookingapp.payload.request.LoginRequest;
import com.moviebookingapp.payload.request.SignUpRequest;
import com.moviebookingapp.payload.response.JwtResponse;
import com.moviebookingapp.payload.response.MessageResponse;
import com.moviebookingapp.repository.RoleRepository;
import com.moviebookingapp.repository.UserRepository;
import com.moviebookingapp.security.jwt.JwtUtils;
import com.moviebookingapp.service.impl.UserDetailsImpl;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1.0/moviebooking")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JwtUtils utils;

	@PostMapping("/register")
	@Operation(summary = "new registration")
	public ResponseEntity<?> register(@Valid @RequestBody SignUpRequest request) {
		if (userRepository.existsByUsername(request.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username already taken!"));
		}

		if (userRepository.existsByEmail(request.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already in use!"));
		}

		User user = new User(request.getUsername(), request.getFirstName(), request.getLastName(), request.getEmail(),
				request.getContactNumber(), encoder.encode(request.getPassword()));

		Set<String> strRoles = request.getRole();
		Set<Role> roles = new HashSet<>();
		String errorMessage = "Error: Role not found!";

		if (strRoles.isEmpty()) {
			Role userRole = roleRepository.findByRole(UserRole.USER)
					.orElseThrow(() -> new RuntimeException(errorMessage));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role admin = roleRepository.findByRole(UserRole.ADMIN)
							.orElseThrow(() -> new RuntimeException(errorMessage));
					roles.add(admin);
					break;

				case "guest":
					Role mod = roleRepository.findByRole(UserRole.GUEST)
							.orElseThrow(() -> new RuntimeException(errorMessage));
					roles.add(mod);
					break;

				default:
					Role userRole = roleRepository.findByRole(UserRole.USER)
							.orElseThrow(() -> new RuntimeException(errorMessage));
					roles.add(userRole);
					break;
				}
			});
		}

		user.setRole(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	@PostMapping("/login")
	@Operation(summary = "login")
	public ResponseEntity<?> authUser(@Valid @RequestBody LoginRequest request) {
		Authentication auth = manager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(auth);
		String jwt = utils.generateJwtToken(auth);

		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).toList();

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUserId(), userDetails.getUsername(),
				userDetails.getEmail(), roles));
	}
}