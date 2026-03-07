import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

export const useChat = (conversationId) => {
    const [message, setMessage] = useState([]);
    useEffect(() => {
        WebSocketService.connect(conversationId, (msg) => {
            setMessage(prev => [...prev, msg]);
        });

        return () => {
            WebSocketService.disconnect();
        }
    }, [conversationId]);

    const sendMessage = (msg) => {
        WebSocketService.sendMessage(msg);
    };
    return {
        message,
        sendMessage
    }
}