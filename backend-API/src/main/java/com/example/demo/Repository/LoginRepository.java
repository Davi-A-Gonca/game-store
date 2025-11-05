package com.example.demo.Repository;

import com.example.demo.Documents.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LoginRepository extends JpaRepository<Login, UUID> {
    Optional<Login> findFirstByEmail(String Email);
}
