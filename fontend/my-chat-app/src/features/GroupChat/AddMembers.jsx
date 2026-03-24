import { useContext, useState } from "react"
import "../../styles/dashboard/addmember.scss"
import { FriendsList } from "./FriendsList"
import { UserContext } from "../../services/UserService/UserContext"
import { Button } from "../../component/Button"
export const AddMember = (props) => {
    const context = useContext(UserContext);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [goupName, setGroupName] = useState("");

    const handleToggleUser = (user) => {
        setSelectedUsers(prev => [...prev, user]);
    }
    console.log(selectedUsers)

    const friends = context.friends;
    // console.log(friends)

    const handleCreateGroup = () => {

    }
    return props.trigger ? (
        <>
            <div className="addmember-background ">
                <div className="add-member">
                    <div className='cancel-button' onClick={() => { props.setTrigger(false) }}>
                        <span>X</span>
                    </div>
                    <div className='d-flex mt-3'>
                        <span style={{ margin: "10px auto" }}>Add friends to your group</span>
                    </div>
                    <div className='search-input'>
                        <input type="text" placeholder='name your group...' onChange={(e) => { setGroupName(e.target.value) }} />
                    </div>
                    <div className='p-3 border' style={{ overflowY: "auto", height: "50%" }}>
                        {friends.map((u, i) => (
                            <a style={{ textDecoration: "none", cursor: "pointer" }} key={i}>
                                <FriendsList name={u.firstName} email={u.email} setAddmember={() => { handleToggleUser(u) }} />
                            </a>
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Button>Create group</Button>
                    </div>
                </div>
            </div>
        </>
    ) : ""
}