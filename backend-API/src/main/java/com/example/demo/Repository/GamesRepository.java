package com.example.demo.Repository;

import com.example.demo.Documents.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GamesRepository extends JpaRepository<Games, UUID> {
}
