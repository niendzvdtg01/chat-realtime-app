package com.example.chatapp.dto;

import java.util.List;

public class CreateGroupRequest {
    private List<GroupMemberCreation> members;
    private String name;

    public List<GroupMemberCreation> getMembers() {
        return this.members;
    }

    public void setMembers(List<GroupMemberCreation> members) {
        this.members = members;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
