import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

export const useChat = (conversationId) => {
    const [message, setMessage] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [calendar, setCalendar] = useState(null);
    const [calendarNotification, setCalendarNotification] = useState(null);

    useEffect(() => {
        setMessage([]);
        setSuggestions([]);
        setCalendar(null);
        setCalendarNotification(null)

        if (!conversationId) {
            return undefined;
        }

        // Each conversation has its own STOMP topics, so reconnect when
        // the selected conversation changes and reset stale UI state first.
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
            },
            onCalendarNotification: (items) => {
                if (Array.isArray(items)) {
                    setCalendarNotification({
                        status: "success",
                        items: items.filter(Boolean),
                    });
                    return;
                }

                if (typeof items === "string" && items.trim()) {
                    setCalendarNotification({
                        status: "success",
                        message: items.trim(),
                    });
                    return;
                }

                if (items && typeof items === "object") {
                    // Backend now sends notification objects directly.
                    setCalendarNotification(items);
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
        calendarNotification,
        sendMessage
    }
}
