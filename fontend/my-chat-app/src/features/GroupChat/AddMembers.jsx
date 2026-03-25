import { useContext, useState } from "react"
import "../../styles/dashboard/addmember.scss"
import { FriendsList } from "./FriendsList"
import { UserContext } from "../../services/UserService/UserContext"
import { Button } from "../../component/Button"
import { Spinner } from "../../component/Spinner"
export const AddMember = (props) => {
    const context = useContext(UserContext);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [goupName, setGroupName] = useState("");
    const loading = context.loading

    const handleToggleUser = (user) => {
        setSelectedUsers(prev => [...prev, user]);
    }
    console.log(selectedUsers)

    const friends = context.friends;
    // console.log(friends)

    const handleCreateGroup = async () => {
        const data = {
            members: selectedUsers,
            name: goupName
        }
        const res = await context.createGroups(data);
        if (res.success) {
            alert("Tao nhom thanh cong")
        } else {
            alert("That bai!!")
        }
        console.log(res.success)
    }

    console.log(loading)
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
                        {loading ? <Spinner /> : <Button onClick={handleCreateGroup}>Create group</Button>}
                    </div>
                </div>
            </div>
        </>
    ) : ""
}