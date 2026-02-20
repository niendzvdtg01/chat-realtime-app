package com.example.chatapp.dto;

public class LoginRequests {
    private String email;
    private String userpassword;

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserpassword() {
        return this.userpassword;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }

    public LoginRequests(String email, String userpassword) {
        this.email = email;
        this.userpassword = userpassword;
    }
}
