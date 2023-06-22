package com.phmth.news.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.phmth.news.dto.response.UserResponse;
import com.phmth.news.dto.resquest.InsertUserRequest;
import com.phmth.news.dto.resquest.SignupForm;
import com.phmth.news.dto.resquest.UpdateUserRequest;
import com.phmth.news.entity.RoleEntity;
import com.phmth.news.entity.UserEntity;
import com.phmth.news.enums.StateUser;
import com.phmth.news.exception.UserException;
import com.phmth.news.repository.IRoleRepository;
import com.phmth.news.repository.IUserRepository;
import com.phmth.news.service.IUserService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService implements IUserService{
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private IUserRepository userRepository;
	
	@Autowired
	private IRoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Optional<UserEntity> findOneByUsernameAndStateUser(String username, StateUser status) {
		return userRepository.findOneByUsernameAndStateUser(username, status);
	}

	@Override
	public boolean existsByUsername(String username) {
		return userRepository.existsByUsername(username);
	}
	
	@Override
	public UserResponse register(SignupForm signupForm) {
		if(signupForm == null) {
			throw new UserException("The input is null");
		}
		
		if(signupForm.isEmpty()) {
			throw new UserException("The input is empty");
		}
		
		if(userRepository.existsByUsername(signupForm.getUsername())) {
			throw new UserException("The username = '"+signupForm.getUsername()+"' exists!");
		}
		
		RoleEntity roleEntity = null;
		
		UserEntity userEntity = new UserEntity();
		
		userEntity.setFullname(signupForm.getFullname());
		userEntity.setUsername(signupForm.getUsername());
		userEntity.setHashPassword(passwordEncoder.encode(signupForm.getPassword()));
		roleEntity = roleRepository.findById((long) 2).get();
		userEntity.setRole(roleEntity);
		userEntity.setStateUser(StateUser.PENDING);
		
		UserEntity userSave = userRepository.save(userEntity);
		
		if(!userRepository.existsById(userSave.getId())) {
			return null;
		}
		
		UserResponse userResponse = new UserResponse();
		userResponse.setId(userSave.getId());
		userResponse.setFullname(userSave.getFullname());
		userResponse.setUsername(userSave.getUsername());
		userResponse.setStatus(userSave.getStateUser());
		roleEntity = roleRepository.findById(userSave.getRole().getId()).get();
		userResponse.setRoles(roleEntity.getName());
		
		return userResponse;
	}

	@Override
	public List<UserResponse> findAll() {
		List<UserEntity> listUserEntity = userRepository.findAll();
		
		if(listUserEntity.isEmpty()) {
			return null;
		}
		
		List<UserResponse> listUserResponse = new ArrayList<>() ;
		for (UserEntity userEntity : listUserEntity) {
			UserResponse userResponse = new UserResponse();
			userResponse.setId(userEntity.getId());
			userResponse.setFullname(userEntity.getFullname());
			userResponse.setUsername(userEntity.getUsername());
			userResponse.setStatus(userEntity.getStateUser());
			userResponse.setRoles(userEntity.getRole().getName());
			
			listUserResponse.add(userResponse);
		}
		
		return listUserResponse;
	}

	@Override
	public Page<UserResponse> findAll(Integer page, Integer limit) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page - 1, limit, sort);
		
		Page<UserEntity> pageUserEntity = userRepository.findAll(pageable);
		
		if(pageUserEntity.isEmpty()) {
			return null;
		}
		
		Page<UserResponse> pageUserResponse = pageUserEntity.map(new Function<UserEntity, UserResponse>() {
		    @Override
		    public UserResponse apply(UserEntity userEntity) {
		    	UserResponse userResponse = new UserResponse();
				userResponse.setId(userEntity.getId());
				userResponse.setFullname(userEntity.getFullname());
				userResponse.setUsername(userEntity.getUsername());
				userResponse.setStatus(userEntity.getStateUser());
				userResponse.setRoles(userEntity.getRole().getName());

		        return userResponse;
		    }
		});
		
		return pageUserResponse;
	}

	@Override
	public UserResponse insert(InsertUserRequest insertUserRequest) {
		if(insertUserRequest == null) {
			throw new UserException("The input is null");
		}
		
		if(insertUserRequest.isEmpty()) {
			throw new UserException("The input is empty");
		}
		
		if(userRepository.existsByUsername(insertUserRequest.getUsername())) {
			throw new UserException("The username = '"+insertUserRequest.getUsername()+"' exists!");
		}
		
		RoleEntity roleEntity = null;
		
		UserEntity userEntity = new UserEntity();
		userEntity.setFullname(insertUserRequest.getFullname());
		userEntity.setUsername(insertUserRequest.getUsername());
		userEntity.setHashPassword(passwordEncoder.encode(insertUserRequest.getPassword()));
		roleEntity = roleRepository.findById((long) 2).get();
		userEntity.setRole(roleEntity);
		userEntity.setStateUser(StateUser.ACTIVED);
		
		UserEntity userSave = userRepository.save(userEntity);
		
		if(!userRepository.existsById(userSave.getId())) {
			return null;
		}
		
		UserResponse userResponse = new UserResponse();
		userResponse.setId(userSave.getId());
		userResponse.setFullname(userSave.getFullname());
		userResponse.setUsername(userSave.getUsername());
		userResponse.setStatus(userSave.getStateUser());
		roleEntity = roleRepository.findById(userSave.getRole().getId()).get();
		userResponse.setRoles(roleEntity.getName());
		
		return userResponse;
	}

	@Override
	public UserResponse update(UpdateUserRequest updateUserRequest) {
		if(updateUserRequest == null) {
			throw new UserException("The input is null!");
		}
		
		if(updateUserRequest.isEmpty()) {
			throw new UserException("The input is empty!");
		}
		
		Optional<UserEntity> oldUserEntity = userRepository.findById(updateUserRequest.getId());
		if(oldUserEntity.isEmpty()) {
			throw new UserException("The user not found!");
		}
		
		oldUserEntity.get().setFullname(updateUserRequest.getFullname());
		oldUserEntity.get().setStateUser(updateUserRequest.getStatus());
		RoleEntity roleEntity = roleRepository.findById(updateUserRequest.getRole()).get();
		oldUserEntity.get().setRole(roleEntity);
		
		UserEntity userSave = userRepository.save(oldUserEntity.get());
		
		if(userSave == null) {
			return null;
		}
		
		UserResponse userResponse = new UserResponse();
		
		userResponse.setId(userSave.getId());
		userResponse.setFullname(userSave.getFullname());
		userResponse.setUsername(userSave.getUsername());
		userResponse.setStatus(userSave.getStateUser());
		roleEntity = roleRepository.findById(userSave.getRole().getId()).get();
		userResponse.setRoles(roleEntity.getName());
		
		return userResponse;
	}
	

}
