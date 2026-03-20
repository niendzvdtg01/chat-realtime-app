import '../../styles/dashboard/userlist.scss'
export const UserCard = (props) => {
    const initial = (props.name ?? '?').toString().trim().slice(0, 1).toUpperCase();
    return (
        <div className="d-flex justify-content-between align-items-center user-card">
            <div className="d-flex align-items-center gap-3">
                <div className="user-avatar">{initial}</div>
                <div>
                    <div className="fw-semibold">{props.name}</div>
                    <div className="text-muted small">{props.email}</div>
                </div>
            </div>
            <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle">Active</span>
        </div>
    )
}
