package com.example.chatapp.dto;

import com.example.chatapp.EnumType.RoleType;

public class GroupMemberCreation {
    private Integer id;
    private Integer userId;
    private RoleType role;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return this.userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public RoleType getRole() {
        return this.role;
    }

    public void setRole(RoleType role) {
        this.role = role;
    }

}
