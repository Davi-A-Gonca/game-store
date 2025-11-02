package com.example.demo.Documents;

import com.example.demo.Documents.dto.LoginDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Login")
@Getter @Setter
public class Login {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    private String email;
    private String senha;

    public Login(){}

    public Login(LoginDTO dto){
        this.id = UUID.randomUUID();
        this.email = dto.getEmail();
        this.senha = dto.getSenha();
    }
}
