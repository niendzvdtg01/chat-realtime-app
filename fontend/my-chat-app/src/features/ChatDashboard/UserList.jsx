import '../../styles/dashboard/userlist.scss'
import addUser from '../../assets/dashboard/user-plus-solid-full.svg'
import groupUser from '../../assets/dashboard/users-solid-full.svg'
import { UserCard } from './UsersCard'
import { useContext, useMemo, useState } from 'react'
import { UserContext } from '../../services/UserService/UserContext'
export const UserList = (props) => {
    const context = useContext(UserContext);
    const user = context.friends ?? [];
    const [query, setQuery] = useState('');

    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return user;
        return user.filter((u) => {
            const name = (u.firstName ?? '').toLowerCase();
            const email = (u.email ?? '').toLowerCase();
            return name.includes(q) || email.includes(q);
        });
    }, [query, user]);
    return (
        <div className='user-list-layout'>
            <div className='contact-search d-flex'>
                <div className="flex-grow-1">
                    <input
                        type="text"
                        value={query}
                        placeholder="Search friends..."
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                </div>
                <div className='add-user d-flex'>
                    <button className="icon-btn" onClick={() => { props.setTrigger(true) }} aria-label="Add friend">
                        <img src={addUser} alt="" />
                    </button>
                    <button className="icon-btn" aria-label="Create group">
                        <img src={groupUser} alt="" />
                    </button>
                </div>
            </div>
            <div className='user-list'>
                <div className="user-list-inner">
                    {filteredUsers.map((u) => (
                        <button
                            type="button"
                            className="user-row"
                            onClick={() => {
                                context.handleCreatePrivateConversation(u.userId);
                            }}
                            key={u.userId ?? `${u.email}-${u.firstName}`}
                        >
                            <UserCard name={u.firstName} email={u.email} />
                        </button>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className="user-empty text-muted">No matches</div>
                    )}
                </div>
            </div>
        </div>
    )
}
