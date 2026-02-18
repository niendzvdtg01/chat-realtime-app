import { useEffect, useState } from "react";
import WebSocketService from "../services/WebSocketService";

export const useChat = () => {
    const [message, setMessage] = useState([]);
    useEffect(() => {
        WebSocketService.connect((msg) => {
            setMessage(prev => [...prev, msg]);
        });

        return () => {
            WebSocketService.disconnect();
        }
    }, []);
}