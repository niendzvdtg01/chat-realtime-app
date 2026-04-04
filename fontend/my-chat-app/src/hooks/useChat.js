import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

export const useChat = (conversationId) => {
    const [message, setMessage] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setMessage([]);
        setSuggestions([]);

        if (!conversationId) {
            return undefined;
        }

        WebSocketService.connect(conversationId, {
            onMessage: (msg) => {
                setMessage(prev => [...prev, msg]);
            },
            onSuggestion: (items) => {
                if (Array.isArray(items)) {
                    setSuggestions(items.filter(Boolean));
                    return;
                }

                if (typeof items === "string" && items.trim()) {
                    setSuggestions([items.trim()]);
                }
            }
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
        suggestions,
        sendMessage
    }
}
