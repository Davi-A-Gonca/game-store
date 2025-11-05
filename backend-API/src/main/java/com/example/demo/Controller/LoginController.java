package com.example.demo.Controller;

import com.example.demo.Safety.Constants;
import com.example.demo.Documents.Login;
import com.example.demo.Documents.dto.LoginDTO;
import com.example.demo.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class LoginController {
    @Autowired
    private LoginService service;

    @PostMapping(value = Constants.API_REGISTER, consumes = "application/json")
    public ResponseEntity<Login> create(@RequestBody LoginDTO dto){
        service.save(dto);

        Login l = new Login(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(l);
    }

    @GetMapping(Constants.API_LOGIN + "/{id}")
    public ResponseEntity<Optional<Login>> findById(@PathVariable("id") UUID id){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping(Constants.API_LOGIN)
    public ResponseEntity<List<Login>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping(Constants.API_LOGIN + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
