import { ChatMessage } from "../features/ChatDashboard/ChatMessage";
import { ChatInfo } from "../features/ChatDashboard/ChatInfo";
import { UserList } from "../features/ChatDashboard/UserList";
import { Verticalbar } from "../features/ChatDashboard/Vertcalbar";
import { UserProvider } from "../services/UserService/handleUserAPI";
import { Contact } from "../features/Contact/Contact";
import { useContext, useState } from "react";
import { useChat } from "../hooks/useChat";
import { UserContext } from "../services/UserService/UserContext";
import "../styles/dashboard/layout.scss";

export default function ChatDashBoard() {
    return (
        <UserProvider>
            <DashboardContent />
        </UserProvider>
    )
}

function DashboardContent() {
    const context = useContext(UserContext);
    const conversationId = context?.message?.conversationId;
    const chatState = useChat(conversationId);
    const [trigger, setTrigger] = useState(false);
    const [key, setKey] = useState(0)
    const [userDetail, setUserDetail] = useState("");

    return (
        <>
            <div className="dashboard-shell">
                <div className="dashboard-nav">
                    <Verticalbar setKey={setKey} />
                </div>
                <div className="dashboard-panel dashboard-users">
                    <UserList setTrigger={setTrigger} activeTab={key} setUserDetail={setUserDetail} />
                </div>
                <div className="dashboard-panel dashboard-chat">
                    <ChatMessage
                        name={userDetail}
                        conversationId={conversationId}
                        message={chatState.message}
                        suggestions={chatState.suggestions}
                        sendMessage={chatState.sendMessage}
                    />
                </div>
                <div className="dashboard-panel dashboard-info">
                    <ChatInfo
                        details={userDetail}
                        conversationId={conversationId}
                        calendar={chatState.calendar}
                        calendarNotification={chatState.calendarNotification}
                    />
                </div>
            </div>
            <Contact trigger={trigger} setTrigger={setTrigger} />
        </>
    )
}
