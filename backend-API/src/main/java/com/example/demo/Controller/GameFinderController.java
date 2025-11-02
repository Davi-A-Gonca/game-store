package com.example.demo.Controller;

import com.example.demo.Safety.Constants;
import com.example.demo.Documents.Games;
import com.example.demo.Documents.dto.GamesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class GameFinderController {

    @Autowired
    GamesController gamesController = new GamesController();

    @PostMapping(Constants.API_GAMES + "/find")
    public ResponseEntity<List<Games>> find(@RequestBody GamesDTO dto){
        ResponseEntity<List<Games>> ListGames = gamesController.findAll();
        if (ListGames.getStatusCode() != HttpStatus.OK || ListGames.getBody() == null
            ||(dto.getPrice().compareTo(BigDecimal.ZERO) <= 0 && dto.getGenre().getFirst() == "" && dto.getConsole() == ""
                && dto.getAgeRating() == "" && dto.getNameGame() == "")) {
            return ListGames;
        }

        List<Games> games = ListGames.getBody();
        List<Games> gamesFound = new ArrayList<>();

        for(Games game : games){
            if(game.getNameGame().equals(dto.getNameGame()) || game.getAgeRating().equals(dto.getAgeRating())
                || game.getConsole().equals(dto.getConsole()) || game.getPrice().compareTo(dto.getPrice()) <= 0
                || (game.getGenre() != null && dto.getGenre() != null
                    && game.getGenre().containsAll(dto.getGenre()))){
                gamesFound.add(game);
            }
        }

        return ResponseEntity.ok(gamesFound);
    }

}
