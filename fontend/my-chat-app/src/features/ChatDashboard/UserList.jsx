import '../../styles/dashboard/userlist.scss'
import addUser from '../../assets/dashboard/user-plus-solid-full.svg'
import groupUser from '../../assets/dashboard/users-solid-full.svg'
import { UserCard } from './UsersCard'
import { useContext, useMemo, useState } from 'react'
import { UserContext } from '../../services/UserService/UserContext'
import { AddMember } from '../GroupChat/AddMembers'
import { GroupCard } from './GroupCard'
export const UserList = (props) => {
    const [addFiendClick, setAddFriendClick] = useState(false)

    const context = useContext(UserContext);
    const user = context.friends ?? [];
    const group = context.group ?? [];
    const [query, setQuery] = useState('');
    const isMessageTab = props.activeTab === 0;
    const isGroupTab = props.activeTab === 1;

    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return user;
        return user.filter((u) => {
            const name = (u.firstName ?? '').toLowerCase();
            const email = (u.email ?? '').toLowerCase();
            return name.includes(q) || email.includes(q);
        });
    }, [query, user]);

    const filteredGroups = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return group;
        return group.filter((g) => (g?.name ?? '').toString().toLowerCase().includes(q));
    }, [query, group]);

    return (
        <div className='user-list-layout'>
            <div className='contact-search d-flex'>
                <div className="flex-grow-1">
                    <input
                        type="text"
                        value={query}
                        placeholder={isGroupTab ? "Search groups..." : "Search friends..."}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                </div>
                <div className='add-user d-flex'>
                    <button className="icon-btn" onClick={() => { props.setTrigger(true) }} aria-label="Add friend">
                        <img src={addUser} alt="" />
                    </button>
                    <button className="icon-btn" aria-label="Create group" onClick={() => { setAddFriendClick(true) }}>
                        <img src={groupUser} alt="" />
                    </button>
                </div>
            </div>
            <div className='user-list'>
                <div className="user-list-inner">
                    {isMessageTab && (filteredUsers.map((u) => (
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
                    )))}
                    {isMessageTab && filteredUsers.length === 0 && (
                        <div className="user-empty text-muted">No matches</div>
                    )}
                    {isGroupTab && (filteredGroups.map((g) => (
                        <button
                            type="button"
                            className="user-row"
                            key={g.conversationId ?? g.name ?? JSON.stringify(g)}
                        >
                            <GroupCard name={g.name} membersCount={g.members?.length} />
                        </button>
                    )))}
                    {isGroupTab && filteredGroups.length === 0 && (
                        <div className="user-empty text-muted">No matches</div>
                    )}
                </div>
            </div>
            <AddMember trigger={addFiendClick} setTrigger={setAddFriendClick} />
        </div>
    )
}
