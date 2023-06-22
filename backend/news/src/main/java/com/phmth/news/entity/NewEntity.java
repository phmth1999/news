package com.phmth.news.entity;

import java.lang.reflect.Field;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name = "news")
public class NewEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private CategoryEntity category;

	@Column(name = "title")
	private String title;

	@Column(name = "thumbnail")
	private String thumbnail;

	@Column(name = "short_description", length = 500)
	private String shortDescription;

	@Column(name = "content", columnDefinition = "TEXT")
	private String content;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updateAt;

	public boolean isEmpty() {
		for (Field field : this.getClass().getDeclaredFields()) {
			try {
				field.setAccessible(true);
				if (field.get(this) != null) {
					return false;
				}
			} catch (Exception e) {
				System.out.println("Exception occured in processing");
			}
		}
		return true;
	}
}
