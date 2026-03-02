import '../../styles/dashboard/userlist.scss'
export const UserCard = (props) => {
    return (
        <>
            <li className="list-group-item d-flex justify-content-between align-items-center user-card" style={{ borderRadius: "0" }}>
                <div>
                    <div className="fw-bold">{props.name}</div>
                    <div className="text-muted">{props.email}</div>
                </div>
                <span className="badge rounded-pill badge-success">Active</span>
            </li>
        </>
    )
}