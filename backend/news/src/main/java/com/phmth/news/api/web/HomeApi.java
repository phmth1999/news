package com.phmth.news.api.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController("homeWeb")
@RequestMapping("/web")
public class HomeApi {
	
	@RequestMapping
	public String getWeb() {
		return "Hello Web";
	}
	
}
