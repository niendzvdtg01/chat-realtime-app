import { ChatMessage } from "../features/ChatDashboard/ChatMessage";
import { ChatInfo } from "../features/ChatDashboard/ChatInfo";
import { UserList } from "../features/ChatDashboard/UserList";
import { Verticalbar } from "../features/ChatDashboard/Vertcalbar";
import { UserProvider } from "../services/UserService/handleUserAPI";
import { Contact } from "../features/Contact/Contact";
import { useState } from "react";

export default function ChatDashBoard() {
    const [trigger, setTrigger] = useState(false);
    return (
        <UserProvider>
            <div>
                <div className="d-flex position-fixed">
                    <Verticalbar />
                    <UserList setTrigger={setTrigger} />
                </div>
                <div className="d-flex positon-fixed">
                    <ChatMessage />
                    <ChatInfo />
                </div>
            </div>
            <Contact trigger={trigger} setTrigger={setTrigger} />
        </UserProvider>
    )
}