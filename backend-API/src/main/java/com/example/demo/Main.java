package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // Aplica para todas as rotas da sua API
						.allowedOrigins("*") // Adicione a origem exata do seu Flutter Web
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD") // Permite todos os métodos necessários
						.allowedHeaders("*") // Permite todos os cabeçalhos
						.allowCredentials(false) // Se você for usar cookies, sessões ou cabeçalhos de autorização como "Authorization"
						.maxAge(3600); // Cache da preflight por 1 hora
			}
		};
	}
}
