import '../../styles/dashboard/userlist.scss'
export const GroupCard = (props) => {
    const name = (props.name ?? 'Unnamed group').toString().trim();
    const initial = name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join('') || '?';
    const membersCount = typeof props.membersCount === 'number' ? props.membersCount : null;
    return (
        <div className="d-flex justify-content-between align-items-center user-card group-card">
            <div className="d-flex align-items-center gap-3">
                <div className="user-avatar group-avatar">{initial}</div>
                <div>
                    <div className="fw-semibold text-truncate">{name}</div>
                    {membersCount !== null && (
                        <div className="text-muted small">{membersCount} members</div>
                    )}
                </div>
            </div>
            <span className="badge rounded-pill bg-primary-subtle text-primary border border-primary-subtle">Group</span>
        </div>
    )
}
