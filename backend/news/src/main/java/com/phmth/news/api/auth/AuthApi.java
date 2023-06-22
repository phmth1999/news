package com.phmth.news.api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phmth.news.dto.response.JwtResponse;
import com.phmth.news.dto.response.MessageResponse;
import com.phmth.news.dto.response.UserResponse;
import com.phmth.news.dto.resquest.SigninForm;
import com.phmth.news.dto.resquest.SignupForm;
import com.phmth.news.exception.UserException;
import com.phmth.news.security.CustomUser;
import com.phmth.news.security.jwt.JwtProvider;
import com.phmth.news.service.IUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthApi {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtProvider jwtProvider;
	
	@PostMapping(value = "/register")
	public ResponseEntity<?> register(@RequestBody SignupForm signupForm){
		try {
			UserResponse userResponse = userService.register(signupForm);
			if(userResponse == null) {
				return new ResponseEntity<>(new MessageResponse("Create failed!", null), HttpStatus.OK);
			}
			return new ResponseEntity<>(new MessageResponse("Create success!", userResponse), HttpStatus.OK);
			
		} catch (UserException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody SigninForm signinForm){
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinForm.getUsername(), signinForm.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String token = jwtProvider.createToken(authentication);
		
		CustomUser userPrinciple = (CustomUser) authentication.getPrincipal();
		
		return ResponseEntity.ok(new JwtResponse(token, userPrinciple.getName(), userPrinciple.getAuthorities()));
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		
		return ResponseEntity.ok(new MessageResponse("Logout success!", null));
	}
	
}
