import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

class WebSocketService {

    constructor() {
        this.client = null;
        this.connected = false;
    }

    connect(onMessage) {

        const socket = new SockJS("http://localhost:8080/ws");

        this.client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000
        });

        this.client.onConnect = () => {

            console.log("STOMP Connected");
            this.connected = true;

            this.client.subscribe("/topic/messages", (message) => {
                onMessage(JSON.parse(message.body));
            });
        };

        this.client.onDisconnect = () => {
            this.connected = false;
        };

        this.client.activate();
    }

    sendMessage(message) {

        if (!this.connected) {
            console.log("STOMP not connected yet");
            return;
        }

        this.client.publish({
            destination: "/app/sendMessage",
            body: JSON.stringify(message)
        });
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.connected = false;
        }
    }
}

export default new WebSocketService();
