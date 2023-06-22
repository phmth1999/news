package com.phmth.news.security.jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.phmth.news.security.CustomUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtProvider {
	private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);
	private String jwtSecret = "Admin1234";
	private int jwtExpiration = 86400;
	
	public String createToken(Authentication authentication) {
		CustomUser userPrinciple = (CustomUser) authentication.getPrincipal();
		Map<String, Object> claims = new HashMap<>();
		Collection<? extends GrantedAuthority> roles = userPrinciple.getAuthorities();
		if (roles.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
			claims.put("isAdmin", true);
		}
		if (roles.contains(new SimpleGrantedAuthority("ROLE_USER"))) {
			claims.put("isUser", true);
		}
		return Jwts.builder().setClaims(claims).setSubject(userPrinciple.getUsername()).setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + jwtExpiration * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}
	public boolean validateToken(String token) {
		boolean valid = false;
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
			valid = true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature -> Message {}", e);
			e.printStackTrace();
		} catch (MalformedJwtException e) {
			logger.error("The token invalid format -> Message {}", e);
			e.printStackTrace();
		} catch (UnsupportedJwtException e) {
			logger.error("Unsupported JWT token -> Message {}", e);
			System.out.println();
			e.printStackTrace();
		} catch (ExpiredJwtException e) {
			logger.error("Expired JWT token -> Message {}", e);
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty -> Message {}", e);
			e.printStackTrace();
		} 
		return valid;
	}
	public String getUserNameFormToken(String token) {
		String userName = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
		return userName;
	}
	public List<SimpleGrantedAuthority> getRolesFromToken(String token) {
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();

		List<SimpleGrantedAuthority> roles = null;

		Boolean isAdmin = claims.get("isAdmin", Boolean.class);
		Boolean isUser = claims.get("isUser", Boolean.class);

		if (isAdmin != null && isAdmin) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
		}

		if (isUser != null && isUser) {
			roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_USER"));
		}
		return roles;

	}
}
