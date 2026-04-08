import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

export const useChat = (conversationId) => {
    const [message, setMessage] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [calendar, setCalendar] = useState(null);

    useEffect(() => {
        setMessage([]);
        setSuggestions([]);
        setCalendar(null);

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
            },
            onCalendar: (items) => {
                if (Array.isArray(items)) {
                    setCalendar({
                        status: "success",
                        items: items.filter(Boolean),
                    });
                    return;
                }

                if (typeof items === "string" && items.trim()) {
                    setCalendar({
                        status: "success",
                        message: items.trim(),
                    });
                    return;
                }

                if (items && typeof items === "object") {
                    setCalendar(items);
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
        calendar,
        sendMessage
    }
}
