package com.phmth.news.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CustomUser extends User {

	private static final long serialVersionUID = 1L;
	private long id;
	private String name;

	public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
	}

	@Override
	public String toString() {
		return "CustomUser [id=" + id + ", name=" + name + "]";
	}

}
