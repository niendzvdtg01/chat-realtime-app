package com.example.chatapp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.chatapp.MongodbModel.MessageDocument;
import com.example.chatapp.dto.CalendarRequest;

@Service
public class AIService {
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Async("aiExecutor")
    public void handleAIAsuync(List<MessageDocument> messageDocument) {
        try {
            // Set so luong gioi han tin nhan AI se doc
            int limitedMessageNumber = 15;
            if (messageDocument == null || messageDocument.isEmpty())
                return;

            List<MessageDocument> limitedMessageDocuments = messageDocument
                    .subList(Math.max(0, messageDocument.size() - limitedMessageNumber), messageDocument.size());

            String flaskUrl = "http://localhost:5000/ai/chat";
            //
            Integer coversationId = messageDocument.get(0).getConversationId();
            //
            List<Map<String, Object>> chatHistory = new ArrayList<>();
            for (MessageDocument response : limitedMessageDocuments) {
                Map<String, Object> body = new HashMap<>();
                body.put("conversationId", response.getConversationId());
                body.put("content", response.getContent());
                chatHistory.add(body);
            }
            //
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, chatHistory, Map.class);
            //
            List<String> aiReply = (List<String>) response.getBody().get("reply");
            messagingTemplate.convertAndSend("/topic/suggestion/" + coversationId, aiReply);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @Async("aiExecutor")
    public void handleCalendarService(CalendarRequest request) {
        try {
            if (request == null)
                return;
            String flaskUrl = "http://localhost:5000/ai/calendar";
            Map<String, Object> body = new HashMap<>();
            body.put("message", buildCalendarMessage(request));
            //
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, body, Map.class);
            //
            Object reply = response.getBody().get("reply");
            messagingTemplate.convertAndSend("/topic/calendar/" + request.getConversationId(), reply);
            System.out.println(reply);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    private String buildCalendarMessage(CalendarRequest request) {
        StringJoiner joiner = new StringJoiner(". ");

        if (request.getType() != null && !request.getType().isBlank()) {
            joiner.add("Loai lich la " + request.getType().trim());
        }
        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            joiner.add("Tieu de la " + request.getTitle().trim());
        }
        if (request.getDate() != null) {
            joiner.add("Ngay dien ra la " + request.getDate());
        }
        if (request.getTime() != null) {
            joiner.add("Gio bat dau la " + request.getTime());
        }
        if (request.getNotes() != null && !request.getNotes().isBlank()) {
            joiner.add("Ghi chu la " + request.getNotes().trim());
        }

        return joiner.toString();
    }

    // send notification for frontend
    public Object sendCalendarNotification(Integer conversationId) {
        try {
            String flaskUrl = "http://localhost:5000/ai/calendar_notification";
            ResponseEntity<Map> response = restTemplate.getForEntity(flaskUrl, Map.class);
            Object reply = response.getBody().get("reply");
            // Publish to websocket for live clients, but also return the same
            // payload to REST callers as a fallback path.
            messagingTemplate.convertAndSend("/topic/calendar_notification/" + conversationId, reply);
            return reply;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
