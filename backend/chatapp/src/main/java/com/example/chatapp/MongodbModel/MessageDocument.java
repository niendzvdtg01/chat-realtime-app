package com.example.chatapp.MongodbModel;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

@Document(collection = "messages")
public class MessageDocument {
    @Id
    private String id;

    private String sender;
    private String content;
    private LocalDateTime timestamp;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSender() {
        return this.sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

}
