package com.example.demo.Controller;

import com.example.demo.Safety.Constants;
import com.example.demo.Safety.WebClientHandler;
import com.example.demo.Documents.Games;
import com.example.demo.Documents.dto.GamesDTO;
import com.example.demo.Services.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
public class GamesController {
    @Autowired
    private GamesService service;

    WebClientHandler handler = new WebClientHandler();

    @PostMapping(Constants.API_GAMES)
    public ResponseEntity<Games> create(@RequestHeader String Authenticator, @RequestBody GamesDTO dto){
        Mono<String> response = handler.validator(Authenticator);

        if(Objects.equals(response.block(), Authenticator)){
            return ResponseEntity.ok(service.save(dto));
        }

        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Authorization");
    }

    @GetMapping(Constants.API_GAMES)
    public ResponseEntity<List<Games>> findAll(){
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping(Constants.API_GAMES + "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable("id") UUID id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
