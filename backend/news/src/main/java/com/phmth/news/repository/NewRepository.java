package com.phmth.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phmth.news.entity.NewEntity;
@Repository
public interface NewRepository extends JpaRepository<NewEntity, Long>{
	
}
