package com.phmth.news.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phmth.news.entity.UserEntity;
import com.phmth.news.enums.StateUser;
@Repository
public interface IUserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findOneByUsernameAndStateUser(String username, StateUser status);
	
	UserEntity findOneByUsername(String username);
	
	Boolean existsByUsername(String username);


}
