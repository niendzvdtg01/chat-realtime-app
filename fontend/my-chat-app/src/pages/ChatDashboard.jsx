import { ChatHeader } from "../components/ChatHeader";
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
            <div className="d-flex">
                <ChatHeader />
                <ChatInfo />
            </div>
        </div>
    )
}