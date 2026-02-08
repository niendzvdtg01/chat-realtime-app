import '../styles/dashboard/userlist.scss'
import addUser from '../assets/dashboard/user-plus-solid-full.svg'
import groupUser from '../assets/dashboard/users-solid-full.svg'
import { UserCard } from './UsersCard'
export const UserList = () => {
    const users = [
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" },
        { name: "John", email: "a@gmail.com" }
    ]
    return (
        <div className='user-list-layout'>
            <div className='contact-search d-flex border'>
                <div>
                    <input type="text" placeholder="Search..." />
                </div>
                <div className='add-user d-flex'>
                    <button className="icon-btn">
                        <img src={addUser} alt="Add user" />
                    </button>
                    <button className="icon-btn">
                        <img src={groupUser} alt="Create group" />
                    </button>
                </div>
            </div>
            <div className='user-list'>
                <ul className="list-group list-group-light" >
                    {users.map((u, index) => (
                        <UserCard name={u.name} email={u.email} />
                    ))}
                </ul>
            </div>
        </div>
    )
}