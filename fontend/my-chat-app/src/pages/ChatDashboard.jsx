import { ChatMessage } from "../components/ChatMessage";
import { ChatInfo } from "../components/ChatInfo";
import { UserList } from "../components/UserList";
import { Verticalbar } from "../components/Vertcalbar";

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