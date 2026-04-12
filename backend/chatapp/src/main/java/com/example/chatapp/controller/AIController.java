package com.example.chatapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.CalendarRequest;
import com.example.chatapp.services.AIService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping(path = "/api/ai")
public class AIController {
    @Autowired
    private AIService aiService;

    @PostMapping(path = "/calendar")
    public ResponseEntity<?> postCalendarInfo(@RequestBody CalendarRequest request) {
        try {
            aiService.handleCalendarService(request);
            return ResponseEntity.ok("Gui thong tin thanh conh!!");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Loi: " + ex);
        }
    }

    @GetMapping(path = "/get_calendar_notifications")
    public ResponseEntity<?> getCalendar(@RequestParam Integer conversationId) {
        try {
            Object reply = aiService.sendCalendarNotification(conversationId);
            return ResponseEntity.ok(reply);
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("Body: " + ex);
        }
    }
}
