import { ChatMessage } from "../features/ChatDashboard/ChatMessage";
import { ChatInfo } from "../features/ChatDashboard/ChatInfo";
import { UserList } from "../features/ChatDashboard/UserList";
import { Verticalbar } from "../features/ChatDashboard/Vertcalbar";
import { UserProvider } from "../services/UserService/handleUserAPI";
import { Contact } from "../features/Contact/Contact";
import { useState } from "react";
import "../styles/dashboard/layout.scss";

export default function ChatDashBoard() {
    const [trigger, setTrigger] = useState(false);
    const [key, setKey] = useState(0)
    const [userDetail, setUserDetail] = useState("");
    return (
        <UserProvider>
            <div className="dashboard-shell">
                <div className="dashboard-nav">
                    <Verticalbar setKey={setKey} />
                </div>
                <div className="dashboard-panel dashboard-users">
                    <UserList setTrigger={setTrigger} activeTab={key} setUserDetail={setUserDetail} />
                </div>
                <div className="dashboard-panel dashboard-chat">
                    <ChatMessage name={userDetail} />
                </div>
                <div className="dashboard-panel dashboard-info">
                    <ChatInfo details={userDetail} />
                </div>
            </div>
            <Contact trigger={trigger} setTrigger={setTrigger} />
        </UserProvider>
    )
}
