import { ChatMessage } from "../features/ChatDashboard/ChatMessage";
import { ChatInfo } from "../features/ChatDashboard/ChatInfo";
import { UserList } from "../features/ChatDashboard/UserList";
import { Verticalbar } from "../features/ChatDashboard/Vertcalbar";
import { UserProvider } from "../services/UserService/handleUserAPI";

export default function ChatDashBoard() {
    return (
        <UserProvider>
            <div>
                <div className="d-flex position-fixed">
                    <Verticalbar />
                    <UserList />
                </div>
                <div className="d-flex positon-fixed">
                    <ChatMessage />
                    <ChatInfo />
                </div>
            </div>
        </UserProvider>
    )
}