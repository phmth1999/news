package com.phmth.news.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.phmth.news.dto.NewDTO;
import com.phmth.news.entity.CategoryEntity;
import com.phmth.news.entity.NewEntity;
import com.phmth.news.exception.CategoryException;
import com.phmth.news.exception.NewException;
import com.phmth.news.repository.ICategoryRepository;
import com.phmth.news.repository.NewRepository;
import com.phmth.news.service.INewService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class NewService implements INewService {
	
	@Autowired
	private NewRepository newRepository;
	
	@Autowired
	private ICategoryRepository categoryRepository;
	
	@Override
	public List<NewDTO> findAll() {
		List<NewEntity> listNewEntity = newRepository.findAll();
		
		if(listNewEntity.isEmpty()) {
			return null;
		}
		
		List<NewDTO> listNewDTO = new ArrayList<>() ;
		for (NewEntity newEntity : listNewEntity) {
			NewDTO newDTO = new NewDTO();
			
			newDTO.setId(newEntity.getId());
			newDTO.setCategory(newEntity.getCategory().getId());
			newDTO.setTitle(newEntity.getTitle());
			newDTO.setThumbnail(newEntity.getThumbnail());
			newDTO.setShortDescription(newEntity.getShortDescription());
			newDTO.setContent(newEntity.getContent());
			
			listNewDTO.add(newDTO);
		}
		
		
		return listNewDTO;
	}
	
	@Override
	public Page<NewDTO> findAll(int page, int limit) {
		Sort sort = Sort.by(Sort.Direction.DESC, "id");
		Pageable pageable = PageRequest.of(page - 1, limit, sort);
		
		Page<NewEntity> pageNewEntity = newRepository.findAll(pageable);
		
		if(pageNewEntity.isEmpty()) {
			return null;
		}
		
		Page<NewDTO> pageNewDTO = pageNewEntity.map(new Function<NewEntity, NewDTO>() {
		    @Override
		    public NewDTO apply(NewEntity newEntity) {
		    	NewDTO newDTO = new NewDTO();
		    	
		    	newDTO.setId(newEntity.getId());
				newDTO.setCategory(newEntity.getCategory().getId());
				newDTO.setTitle(newEntity.getTitle());
				newDTO.setThumbnail(newEntity.getThumbnail());
				newDTO.setShortDescription(newEntity.getShortDescription());
				newDTO.setContent(newEntity.getContent());
		    	
		        return newDTO;
		    }
		});
		return pageNewDTO;
	}
	
	@Override
	public NewDTO insert(NewDTO newDTO) {
		if(newDTO == null) {
			throw new NewException("The input is null");
		}
		
		if(newDTO.isEmpty()) {
			throw new NewException("The input is empty");
		}
		
		Optional<CategoryEntity> categoryEntity = categoryRepository.findById(newDTO.getCategory());
		if(categoryEntity.isEmpty()) {
			throw new CategoryException("Category with id ='"+newDTO.getCategory()+"' not found!");
		}
		
		NewEntity newEntity = new NewEntity();
		newEntity.setCategory(categoryEntity.get());
		newEntity.setTitle(newDTO.getTitle());
		newEntity.setThumbnail(newDTO.getThumbnail());
		newEntity.setShortDescription(newDTO.getShortDescription());
		newEntity.setContent(newDTO.getContent());
		
		NewEntity newSave  = newRepository.save(newEntity);
		
		if(!newRepository.existsById(newSave.getId())) {
			return null;
		}
		
		NewDTO newResponse = new NewDTO();
    	
		newResponse.setId(newSave.getId());
		newResponse.setCategory(newSave.getCategory().getId());
		newResponse.setTitle(newSave.getTitle());
		newResponse.setThumbnail(newSave.getThumbnail());
		newResponse.setShortDescription(newSave.getShortDescription());
		newResponse.setContent(newSave.getContent());
		
		return newResponse;
	}
	
	@Override
	public NewDTO update(NewDTO newDTO) {
		if(newDTO == null) {
			throw new NewException("The input is null");
		}
		
		if(newDTO.isEmpty()) {
			throw new NewException("The input is empty");
		}
		
		Optional<NewEntity> oldNewEntity = newRepository.findById(newDTO.getId());
		if(oldNewEntity.isEmpty()) {
			throw new NewException("News with id ='"+newDTO.getId()+"' not found!");
		}
		
		Optional<CategoryEntity> categoryEntity = categoryRepository.findById(newDTO.getCategory());
		if(categoryEntity.isEmpty()) {
			throw new CategoryException("Category with id ='"+newDTO.getCategory()+"' not found!");
		}
		
		oldNewEntity.get().setCategory(categoryEntity.get());
		oldNewEntity.get().setTitle(newDTO.getTitle());
		oldNewEntity.get().setThumbnail(newDTO.getThumbnail());
		oldNewEntity.get().setShortDescription(newDTO.getShortDescription());
		oldNewEntity.get().setContent(newDTO.getContent());
		
		NewEntity newSave = newRepository.save(oldNewEntity.get());
		
		if(newSave == null) {
			return null;
		}
		
		NewDTO newResponse = new NewDTO();
    	
		newResponse.setId(newSave.getId());
		newResponse.setCategory(newSave.getCategory().getId());
		newResponse.setTitle(newSave.getTitle());
		newResponse.setThumbnail(newSave.getThumbnail());
		newResponse.setShortDescription(newSave.getShortDescription());
		newResponse.setContent(newSave.getContent());
		
		return newResponse;
	}

	@Override
	public boolean delete(long[] ids) {
		for (long id : ids) {
			if(!newRepository.existsById(id)) {
				throw new NewException("News with id = '"+id+"' not exist!");
			}
			
			newRepository.deleteById(id);
			
			if(newRepository.existsById(id)) {
				return false;
			}
		}
		return true;
	}

	@Override
	public int totalItem() {
		return (int) newRepository.count();
	}

}
