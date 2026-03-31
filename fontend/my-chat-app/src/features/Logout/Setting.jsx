import { useContext } from "react"
import "../../styles/dashboard/logout.scss"
import { UserContext } from "../../services/UserService/UserContext"
import { useNavigate } from "react-router-dom";

export const Setting = () => {
    const context = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const res = await context.UserLogout();
        if (res.success) {
            navigate("/")
        }
    }
    return (
        <>
            <div className="logout">
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <button className="logout-button"
                        onClick={handleLogout}
                    >Logout</button>
                </div>
            </div>
        </>
    )
}