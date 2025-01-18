package com.moviebookingapp.service.impl;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.moviebookingapp.model.User;

public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private ObjectId userId;

	private String username;

	private String firstName;

	private String lastName;

	private String email;

	private Long contactNumber;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public ObjectId getUserId() {
		return userId;
	}

	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Long contactNumber) {
		this.contactNumber = contactNumber;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public UserDetailsImpl(ObjectId userId, String username, String firstName, String lastName, String email,
			Long contactNumber, String password, Collection<? extends GrantedAuthority> authorities) {
		this.userId = userId;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.contactNumber = contactNumber;
		this.password = password;
		this.authorities = authorities;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object object) {
		if (this == object) {
			return true;
		}
		if (object == null || getClass() != object.getClass()) {
			return false;
		}
		UserDetailsImpl user = (UserDetailsImpl) object;
		return Objects.equals(userId, user.userId);
	}

	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRole().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRole().name())).collect(Collectors.toList());

		return new UserDetailsImpl(user.getUserId(), user.getUsername(), user.getFirstName(), user.getLastName(),
				user.getEmail(), user.getContactNumber(), user.getPassword(), authorities);
	}
}