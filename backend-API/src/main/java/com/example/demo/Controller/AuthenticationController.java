package com.example.demo.Controller;

import com.example.demo.Documents.dto.LoginDTO;
import com.example.demo.Safety.Constants;
import com.example.demo.Safety.WebClientHandler;
import com.example.demo.Safety.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

@RestController
public class AuthenticationController {

    @Autowired
    private JWTTokenProvider tokenProvider;

    WebClientHandler handler = new WebClientHandler();

    @PostMapping(Constants.API_LOGIN)
    public ResponseEntity<String> login(@RequestBody LoginDTO dto){
        WebClient.ResponseSpec responseSpec = handler.webBuilderLogin(dto, "login/");

        Mono<Boolean> response = responseSpec.bodyToMono(Boolean.class);

        if (Boolean.TRUE.equals(response.block())){
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", tokenProvider.tokenGenerator(dto.getEmail()));

            return new ResponseEntity<String>("Authorized", headers, HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid User and/or Password");
    }

    @PostMapping(Constants.API_REGISTER)
    public ResponseEntity<String> register(@RequestBody LoginDTO dto){
        WebClient.ResponseSpec responseBuilder = handler.webBuilderLogin(dto, "register/");

        WebClient.ResponseSpec responseSpec = responseBuilder.onStatus(
                HttpStatus.BAD_REQUEST::equals,
                response -> {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exits");
                });

        Mono<Boolean> response = responseSpec.bodyToMono(Boolean.class);

        if (Boolean.TRUE.equals(response.block())){
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", tokenProvider.tokenGenerator(dto.getEmail()));

            return new ResponseEntity<>("Authorized", headers, HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exits");
    }

    @GetMapping(Constants.VERIFY)
    private ResponseEntity<String> verifyValidity(@RequestHeader String Authorization){
        System.out.println("Entered verifyValidity");
        if (tokenProvider.validateToken(Authorization)){
            System.out.println("User " + tokenProvider.getUserFromToken(Authorization) + " validated!");
            return ResponseEntity.ok(Authorization);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token Invalid");
    }
}