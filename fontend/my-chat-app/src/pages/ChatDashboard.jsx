import { ChatMessage } from "../features/ChatDashboard/ChatMessage";
import { ChatInfo } from "../features/ChatDashboard/ChatInfo";
import { UserList } from "../features/ChatDashboard/UserList";
import { Verticalbar } from "../features/ChatDashboard/Vertcalbar";

export default function ChatDashBoard() {
    return (
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
    )
}