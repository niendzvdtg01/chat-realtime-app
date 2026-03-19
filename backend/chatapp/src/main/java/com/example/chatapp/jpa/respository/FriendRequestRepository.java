package com.example.chatapp.jpa.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.entity.FriendRequest;
import com.example.chatapp.entity.Users;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Integer> {
    FriendRequest findBySenderIdAndReceiverId(Users senderId, Users receiverId);
}
