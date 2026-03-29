package com.example.chatapp.jpa.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.chatapp.entity.Users;

public interface UsersRespository extends JpaRepository<Users, Integer> {
    Optional<Users> findByEmail(String email);

    @Query("""
               SELECT u FROM Users u
                WHERE u.firstName LIKE %:firstName%
                AND u.userId != :currentId
            """)
    List<Users> findByUserName(@Param("firstName") String firstName, @Param("currentId") Integer currentId);

    @Query("""
            SELECT u FROM Users u
            JOIN FriendRequest f ON f.senderId = u
            WHERE f.receiverId.id = :userId
            AND f.status <>  com.example.chatapp.EnumType.StatusType.ACCEPTED
            """)
    List<Users> findFriendRequest(@Param("userId") Integer userId);

    @Query(value = """
                SELECT * FROM Users u WHERE u.user_id IN (
                    SELECT c.friend_id FROM Contact c WHERE c.user_id = :userId
                    UNION
                    SELECT c.user_id FROM Contact c WHERE c.friend_id = :userId
                )
            """, nativeQuery = true)
    List<Users> findAllFriends(@Param("userId") Integer userId);

    
}
