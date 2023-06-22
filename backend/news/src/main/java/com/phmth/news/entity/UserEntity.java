package com.phmth.news.entity;

import java.lang.reflect.Field;
import java.util.Date;

import com.phmth.news.enums.StateUser;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name = "users")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "role_id")
	private RoleEntity role;

	@Column(name = "username")
	private String username;

	@Column(name = "hash_password")
	private String hashPassword;

	@Column(name = "fullname")
	private String fullname;

	@Enumerated(EnumType.STRING)
	@Column(name = "state_user")
	private StateUser stateUser;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updateAt;
	
	public boolean isEmpty()  {

	    for (Field field : this.getClass().getDeclaredFields()) {
	        try {
	            field.setAccessible(true);
	            if (field.get(this)!=null) {
	                return false;
	            }
	        } catch (Exception e) {
	          System.out.println("Exception occured in processing");
	        }
	    }
	    return true;
	}

}
