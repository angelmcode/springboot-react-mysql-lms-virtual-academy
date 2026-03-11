package com.angel.virtual_academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class VirtualAcademyApplication {

	public static void main(String[] args) {
		SpringApplication.run(VirtualAcademyApplication.class, args);
	}

}
