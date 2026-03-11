package com.example.chatapp.jpa.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.FriendRequest;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {
    //
}
