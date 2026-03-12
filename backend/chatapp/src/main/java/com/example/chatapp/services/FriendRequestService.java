package com.example.chatapp.services;

import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;

import com.example.chatapp.EnumType.StatusType;
import com.example.chatapp.dto.FriendRequestCreation;
import com.example.chatapp.entity.FriendRequest;
import com.example.chatapp.entity.Users;
import com.example.chatapp.exception.UserNotFoundException;
import com.example.chatapp.jpa.respository.FriendRequestRepository;
import com.example.chatapp.jpa.respository.UsersRespository;

@Service
public class FriendRequestService {
    private final FriendRequestRepository friendRequestRepository;
    private final UsersRespository usersRespository;

    public FriendRequestService(FriendRequestRepository friendRequestRepository, UsersRespository usersRespository) {
        this.friendRequestRepository = friendRequestRepository;
        this.usersRespository = usersRespository;
    }

    public FriendRequest createFriendRequest(FriendRequestCreation request, Integer senderId) {
        FriendRequest friendRequest = new FriendRequest();
        Users sender = usersRespository.findById(senderId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!"));
        friendRequest.setSenderId(sender);
        Users receiver = usersRespository.findById(request.getReceiverId())
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        friendRequest.setReceiverId(receiver);
        friendRequest.setStatus(StatusType.PENDING);
        return friendRequestRepository.save(friendRequest);
    }

    public FriendRequest setStatusFriendRequest(FriendRequestCreation request, Integer senderId) {
        Users sender = usersRespository.findById(senderId)
                .orElseThrow(() -> new UserNotFoundException("User not found!!"));
        Users receiver = usersRespository.findById(request.getReceiverId())
                .orElseThrow(() -> new UserNotFoundException("User not found!!!"));
        FriendRequest friendRequest = friendRequestRepository.findBySenderIdAndReceiverId(sender, receiver);
        if (friendRequest == null) {
            throw new UserNotFoundException("No sender request find");
        }
        switch (request.getStatus()) {
            case ACCEPTED:
                friendRequest.setStatus(StatusType.ACCEPTED);
                break;
            case REJECTED:
                friendRequest.setStatus(StatusType.REJECTED);
                break;
            default:
                throw new RuntimeException("Invalid action");
        }
        return friendRequestRepository.save(friendRequest);
    }
}
