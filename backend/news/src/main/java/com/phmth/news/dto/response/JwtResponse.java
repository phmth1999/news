package com.phmth.news.dto.response;

import java.lang.reflect.Field;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
	
	private String type ="Bearer";
	private String token;
	private String fullName;
	private Collection<? extends GrantedAuthority> roles;
	
	public boolean isEmpty()  {
	    for (Field field : this.getClass().getDeclaredFields()) {
	        try {
	            field.setAccessible(true);
	            if (field.get(this)!=null) {
	                return false;
	            }
	        } catch (Exception e) {
	          System.out.println("Exception occured in processing");
	        }
	    }
	    return true;
	}
	public JwtResponse(String token, String fullName,
			Collection<? extends GrantedAuthority> roles) {
		this.token = token;
		this.fullName = fullName;
		this.roles = roles;
	}
}
