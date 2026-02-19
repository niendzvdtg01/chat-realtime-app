package com.example.chatapp.controller;

import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.LoginRequests;
import com.example.chatapp.entity.Users;
import com.example.chatapp.security.jwtUtils;
import com.example.chatapp.services.AuthServices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "/auth")
public class AuthController {
    @Autowired
    private AuthServices authServices;

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody LoginRequests requests, HttpServletResponse response) {
        Users user = authServices.authencate(requests.getEmail(), requests.getUserpassword());
        String token = jwtUtils.generateToken(user);

        ResponseCookie cookie = ResponseCookie.from("access_cookie", token)
                .httpOnly(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMinutes(60))
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok("Login sucessfully!!!");
    }

}
