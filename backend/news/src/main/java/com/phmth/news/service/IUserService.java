package com.phmth.news.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.phmth.news.dto.response.UserResponse;
import com.phmth.news.dto.resquest.InsertUserRequest;
import com.phmth.news.dto.resquest.SignupForm;
import com.phmth.news.dto.resquest.UpdateUserRequest;
import com.phmth.news.entity.UserEntity;
import com.phmth.news.enums.StateUser;

public interface IUserService {
	List<UserResponse> findAll();

	Page<UserResponse> findAll(Integer page, Integer limit);

	Optional<UserEntity> findOneByUsernameAndStateUser(String username, StateUser status);

	boolean existsByUsername(String username);

	UserResponse register(SignupForm signupForm);

	UserResponse insert(InsertUserRequest insertUserRequest);

	UserResponse update(UpdateUserRequest updateUserRequest);

	boolean delete(long id);
}
