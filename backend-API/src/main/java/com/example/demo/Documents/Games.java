package com.example.demo.Documents;

import com.example.demo.Documents.dto.GamesDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Games")
@Getter @Setter
public class Games {

    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private String nameGame;
    private List<String> genre;
    private String ageRating;
    private String console;
    private String synopsis;

    public Games(){}

    public Games(GamesDTO dto){
        this.id = UUID.randomUUID();
        this.price = dto.getPrice();
        this.nameGame = dto.getNameGame();
        this.genre = dto.getGenre();
        this.ageRating = dto.getAgeRating();
        this.console = dto.getConsole();
        this.synopsis = dto.getSynopsis();
    }
}
