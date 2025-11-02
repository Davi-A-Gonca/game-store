package com.example.demo.Documents.dto;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
public class GamesDTO {
    private String nameGame;
    private BigDecimal price; //@Column(precision = 10, scale = 2)
    private List<String> genre; //'Ação', 'Aventura', 'Terror', 'RPG', 'Simulação', 'Estratégia', 'Sobrevivência', 'Mistério', 'Quebra-cabeça'
    private String ageRating; //'L', '10', '12', '14', '16', '18'
    private String console;
    private String synopsis;
}
