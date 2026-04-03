package com.example.chatapp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.chatapp.MongodbModel.MessageDocument;

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
}
