package com.example.chatapp.services;

import java.util.HashMap;
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
    public void handleAIAsuync(MessageDocument messageDocument) {
        try {
            String flaskUrl = "http://localhost:5000/ai/chat";
            //
            Map<String, Object> body = new HashMap<>();
            //
            body.put("conversationId", messageDocument.getConversationId());
            body.put("content", messageDocument.getContent());
            //
            ResponseEntity<Map> response = restTemplate.postForEntity(flaskUrl, body, Map.class);
            //
            String aiReply = (String) response.getBody().get("reply");
            MessageDocument aiMessage = new MessageDocument();
            aiMessage.setConversationId(messageDocument.getConversationId());
            aiMessage.setContent(aiReply);
            messagingTemplate.convertAndSend("/topic/conversation/" + aiMessage.getConversationId(), aiMessage);
        } catch (Exception ex) {
            throw new RuntimeException("Loi: " + ex);
        }

    }
}
