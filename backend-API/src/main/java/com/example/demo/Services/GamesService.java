package com.example.demo.Services;

import com.example.demo.Documents.Games;
import com.example.demo.Documents.dto.GamesDTO;
import com.example.demo.Repository.GamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GamesService {
    @Autowired
    GamesRepository repository;

    public Games save(GamesDTO dto){
        Games c = new Games(dto);
        repository.save(c);
        return c;
    }

    public List<Games> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
