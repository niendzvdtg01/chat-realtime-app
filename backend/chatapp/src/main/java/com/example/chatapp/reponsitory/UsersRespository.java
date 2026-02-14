package com.example.chatapp.reponsitory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.Users;

public interface UsersRespository extends JpaRepository<Users, Integer> {
    List<Users> findByEmail(String email);
}