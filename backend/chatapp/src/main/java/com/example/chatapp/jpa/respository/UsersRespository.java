package com.example.chatapp.jpa.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.Users;

public interface UsersRespository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);
}