package com.example.demo.Services;

import com.example.demo.Documents.Login;
import com.example.demo.Documents.dto.LoginDTO;
import com.example.demo.Repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoginService {
    @Autowired
    LoginRepository repository;

    public Login save(LoginDTO dto){
        Login l = new Login(dto);
        repository.save(l);
        return l;
    }

    public Optional<Login> findById(UUID id){
        return repository.findById(id);
    }

    public List<Login> findAll(){
        return repository.findAll();
    }

    public void deleteById(UUID id){
        repository.deleteById(id);
    }
}
