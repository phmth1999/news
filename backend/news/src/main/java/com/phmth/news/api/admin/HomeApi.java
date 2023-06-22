package com.phmth.news.api.admin;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController("homeAdmin")
@RequestMapping("/admin")
public class HomeApi {
	
	@RequestMapping({"","/home"})
	public String getAdmin()
	{
		return "Hello Admin";
	}
	
}
