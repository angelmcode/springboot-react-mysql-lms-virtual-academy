package com.angel.virtual_academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class VirtualAcademyApplication {

	public static void main(String[] args) {
		SpringApplication.run(VirtualAcademyApplication.class, args);
	}

}
