package com.phmth.news.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phmth.news.dto.response.MessageResponse;
import com.phmth.news.dto.response.PageResponse;
import com.phmth.news.dto.response.UserResponse;
import com.phmth.news.dto.resquest.InsertUserRequest;
import com.phmth.news.dto.resquest.UpdateUserRequest;
import com.phmth.news.exception.UserException;
import com.phmth.news.service.IUserService;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserApi {
	@Autowired
	private IUserService userService;
	
	@RequestMapping("/get-all")
	public ResponseEntity<?> getUser(
			@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "limit", required = false, defaultValue = "0") Integer limit){
		
		if(page == 0 && limit == 0) {
			List<UserResponse> listUserResponse  = userService.findAll();
			if(!listUserResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("success!", listUserResponse), HttpStatus.OK);
			}
		}
		
		if(page != 0 && limit != 0) {
			Page<UserResponse> listPageUser = userService.findAll(page, limit);
			if(!listPageUser.isEmpty()) {
				List<UserResponse> listUserResponse = listPageUser.getContent();
				return new ResponseEntity<>(new MessageResponse("success!", new PageResponse(page,listPageUser.getTotalPages(),limit,listUserResponse)), HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<>(new MessageResponse("failed!", null), HttpStatus.OK);
	}
	
	@PostMapping(value = "/insert")
	public ResponseEntity<?> insert(@RequestBody InsertUserRequest insertUserRequest){
		try {
			UserResponse userResponse = userService.insert(insertUserRequest);
			
			if(userResponse == null || userResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("Create failed!", null), HttpStatus.OK);
			}
			
			return new ResponseEntity<>(new MessageResponse("Create success!", userResponse), HttpStatus.OK);
			
		} catch (UserException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
	@PostMapping(value = "/update")
	public ResponseEntity<?> update(@RequestBody UpdateUserRequest updateUserRequest){
		try {
			UserResponse userResponse = userService.update(updateUserRequest);
			
			if(userResponse == null || userResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("Create failed!", null), HttpStatus.OK);
			}
			
			return new ResponseEntity<>(new MessageResponse("Create success!", userResponse), HttpStatus.OK);
			
		} catch (UserException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
	
}
