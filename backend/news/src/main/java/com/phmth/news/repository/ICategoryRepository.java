package com.phmth.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.phmth.news.entity.CategoryEntity;
@Repository
public interface ICategoryRepository extends JpaRepository<CategoryEntity, Long>{
	
}
