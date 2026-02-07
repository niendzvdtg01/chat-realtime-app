import { UserList } from "../components/UserList";
import { Verticalbar } from "../components/Vertcalbar";

export default function ChatDashBoard() {
    return (
        <div>
            <div className="d-flex">
                <Verticalbar />
                <UserList />
            </div>
        </div>
    )
}