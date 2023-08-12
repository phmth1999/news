package com.phmth.news.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.phmth.news.dto.NewDTO;
import com.phmth.news.dto.response.MessageResponse;
import com.phmth.news.dto.response.PageResponse;
import com.phmth.news.exception.NewException;
import com.phmth.news.service.INewService;

@CrossOrigin
@RestController
@RequestMapping("/new")
public class NewApi {
	
	@Autowired
	private INewService newService;
	
	@GetMapping(value = "/get-all")
	public ResponseEntity<?> showNew(
						@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
						@RequestParam(value = "limit", required = false, defaultValue = "0") Integer limit){
		if(page == 0 && limit == 0) {
			List<NewDTO> listNewResponse = newService.findAll();
			if(!listNewResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("success!", listNewResponse), HttpStatus.OK);
			}
		}
		
		if(page != 0 && limit != 0) {
			Page<NewDTO> listPageNew = newService.findAll(page, limit);
			if(!listPageNew.isEmpty()) {
				List<NewDTO> listNewResponse = listPageNew.getContent();
				return new ResponseEntity<>(new MessageResponse("success!", new PageResponse(page,listPageNew.getTotalPages(),limit,listNewResponse)), HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<>(new MessageResponse("failed!", null), HttpStatus.OK);
		
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<?> showNewById(@PathVariable("id") long id){
		NewDTO newResponse = newService.findById(id);
		if(newResponse == null) {
			return new ResponseEntity<>(new MessageResponse("failed!", null), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(new MessageResponse("success!", newResponse), HttpStatus.OK);
		}
	}

	@PostMapping(value = "/insert")
	public ResponseEntity<?> createNew(@RequestBody NewDTO newDTO) {
		try {
			NewDTO newResponse = newService.insert(newDTO);
			
			if(newResponse == null || newResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("Create new failed!", null), HttpStatus.OK);
			}
			
			return new ResponseEntity<>(new MessageResponse("Create new success!", newResponse), HttpStatus.OK);
			
		} catch (NewException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
	
	@PutMapping(value = "/update")
	public ResponseEntity<?> updateNew(@RequestBody NewDTO newDTO) {
		try {
			NewDTO newResponse = newService.update(newDTO);
			
			if(newResponse == null || newResponse.isEmpty()) {
				return new ResponseEntity<>(new MessageResponse("Update new failed!", null), HttpStatus.OK);
			}
			
			return new ResponseEntity<>(new MessageResponse("Update new success!", newResponse), HttpStatus.OK);
			
		} catch (NewException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
	
	
	@DeleteMapping(value = "/delete/{id}")
	public ResponseEntity<?> deleteNew(@PathVariable("id") long id) {
		try {
			boolean newResponse = newService.delete(id);
			if(!newResponse) {
				return new ResponseEntity<>(new MessageResponse("Delete new failed!", null), HttpStatus.OK);
			}
			
			return new ResponseEntity<>(new MessageResponse("Delete new success!", "success"), HttpStatus.OK);
		} catch (NewException e) {
			return new ResponseEntity<>(new MessageResponse(e.getMessage(), null), HttpStatus.OK);
		}
	}
}
