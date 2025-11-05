package com.example.demo.Controller;

import com.example.demo.Documents.Login;
import com.example.demo.Documents.dto.LoginDTO;
import com.example.demo.Safety.Constants;
import com.example.demo.Safety.WebClientHandler;
import com.example.demo.Safety.JWTTokenProvider;
import com.example.demo.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.Optional;

@RestController
public class AuthenticationController {

    @Autowired
    private LoginService service;

    @Autowired
    private JWTTokenProvider tokenProvider;

    WebClientHandler handler = new WebClientHandler();

    @PostMapping(Constants.API_LOGIN)
    public ResponseEntity<String> login(@RequestBody LoginDTO dto){
        WebClient.ResponseSpec responseSpec = handler.webBuilderLogin(dto, "/login");
        Optional<Login> loginFound = service.findByEmail(dto.getEmail());

        if(loginFound.isEmpty()){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid User and/or Password");
        }

        Login login = loginFound.get();

        if (responseSpec != null && login.getSenha() != dto.getSenha()){
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", tokenProvider.tokenGenerator(dto.getEmail()));
            String test = tokenProvider.tokenGenerator(dto.getEmail());

            return new ResponseEntity<String>(test, headers, HttpStatus.OK);
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid User and/or Password");
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