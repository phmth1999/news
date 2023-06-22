package com.phmth.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phmth.news.entity.RoleEntity;
@Repository
public interface IRoleRepository extends JpaRepository<RoleEntity, Long>{
	
}
