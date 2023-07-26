package com.phmth.news.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.phmth.news.dto.NewDTO;

public interface INewService {
	
	List<NewDTO> findAll();
	Page<NewDTO> findAll(int page, int limit);
	
	NewDTO findById(long id);
	
	NewDTO insert(NewDTO newDTO);
	
	NewDTO update(NewDTO newDTO);
	
	boolean delete(long[] id);
	
	int totalItem();
}
