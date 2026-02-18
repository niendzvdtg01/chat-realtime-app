import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
    constructor() {
        this.client = null;
    }

    connect(onMessageReceived) {
        const socket = new SockJS("http://localhost:8080/chat");
        this.client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000
        });

        this.client.onConnect = () => {
            console.log("Web socket connected!");

            this.client.subscribe("/topic/messages", (messages) => {
                const data = JSON.parse(messages);
                onMessageReceived(data);
            });
        };
        this.client.activate();
    }

    sendMessage(messages) {
        if (!this.client) return;
        this.client.publish({
            destination: "app/sendMessage",
            body: JSON.stringify(messages)
        })
    }
    disconnect() {
        if (!this.client) {
            this.client.deactivate();
        }
    }
}

export default new WebSocketService();