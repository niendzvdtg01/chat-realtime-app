import '../../styles/dashboard/chatinfo.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
import { ViewProfile } from '../ViewProfile/ViewProfile'
import { useState } from 'react'
export const ChatInfo = (props) => {
    const [viewprofile, setViewProfile] = useState(false)
    const [showScheduler, setShowScheduler] = useState(false)
    const [scheduleSaved, setScheduleSaved] = useState(false)
    const [scheduleDraft, setScheduleDraft] = useState({
        type: 'meeting',
        title: '',
        date: '',
        time: '',
        mode: 'online',
        location: '',
        reminder: '15 minutes before',
        note: ''
    })
    const details = props.details

    const targetName = details.firstName || details.name || "this chat"
    const membersCount = Array.isArray(details.members) ? details.members.length : 0

    const handleDraftChange = (event) => {
        const { name, value } = event.target
        setScheduleSaved(false)
        setScheduleDraft((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleScheduleSubmit = (event) => {
        event.preventDefault()
        setScheduleSaved(true)
    }

    return (
        <div className="chat-info">
            <div className="chat-info-header d-flex justify-content-center">
                <h2>Infomations</h2>
            </div>
            <div className='chat-about'>
                <div className='chat-info-hero'>
                    <img src={details.avatarUrl || userHeadr} alt="User" className='rounded-circle' />
                    <div className="chat-info-name">{details.firstName || details.name || "User/Group"}</div>
                    <div className="chat-info-meta text-muted">Details and actions</div>
                </div>
                <div className="chat-info-section">
                    <div className="chat-info-section-title">Quick actions</div>
                    <div className="d-grid gap-2">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => { setViewProfile(true) }}>View profile</button>
                        <button
                            type="button"
                            className={`btn btn-sm ${showScheduler ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setShowScheduler((prev) => !prev)}
                        >
                            {showScheduler ? "Hide scheduler" : "Schedule meeting / event"}
                        </button>
                    </div>
                </div>
                {showScheduler && (
                    <div className="chat-info-section chat-scheduler">
                        <div className="chat-info-section-title">Set up a plan</div>
                        <form className="chat-scheduler-form" onSubmit={handleScheduleSubmit}>
                            <div className="chat-scheduler-grid">
                                <label className="chat-field">
                                    <span>Type</span>
                                    <select name="type" value={scheduleDraft.type} onChange={handleDraftChange}>
                                        <option value="meeting">Meeting</option>
                                        <option value="event">Event</option>
                                    </select>
                                </label>
                                <label className="chat-field">
                                    <span>Reminder</span>
                                    <select name="reminder" value={scheduleDraft.reminder} onChange={handleDraftChange}>
                                        <option value="15 minutes before">15 minutes before</option>
                                        <option value="30 minutes before">30 minutes before</option>
                                        <option value="1 hour before">1 hour before</option>
                                        <option value="1 day before">1 day before</option>
                                    </select>
                                </label>
                                <label className="chat-field chat-field-wide">
                                    <span>Title</span>
                                    <input
                                        type="text"
                                        name="title"
                                        value={scheduleDraft.title}
                                        onChange={handleDraftChange}
                                        placeholder={`Plan a ${scheduleDraft.type} with ${targetName}`}
                                    />
                                </label>
                                <label className="chat-field">
                                    <span>Date</span>
                                    <input type="date" name="date" value={scheduleDraft.date} onChange={handleDraftChange} />
                                </label>
                                <label className="chat-field">
                                    <span>Time</span>
                                    <input type="time" name="time" value={scheduleDraft.time} onChange={handleDraftChange} />
                                </label>
                                <label className="chat-field chat-field-wide">
                                    <span>Notes</span>
                                    <textarea
                                        name="note"
                                        rows="3"
                                        value={scheduleDraft.note}
                                        onChange={handleDraftChange}
                                        placeholder="Agenda, dress code, files to prepare..."
                                    />
                                </label>
                            </div>
                            <div className="chat-scheduler-preview">
                                <div className="scheduler-pill">{scheduleDraft.type === 'meeting' ? 'Meeting' : 'Event'}</div>
                                <div className="scheduler-preview-title">
                                    {scheduleDraft.title || `Plan with ${targetName}`}
                                </div>
                                <div className="scheduler-preview-meta">
                                    <span>{scheduleDraft.date || 'Pick a date'}</span>
                                    <span>{scheduleDraft.time || 'Pick a time'}</span>
                                    <span>{scheduleDraft.mode}</span>
                                </div>
                                <p>
                                    For {targetName} {membersCount > 0 ? `and ${membersCount} members` : ''}.
                                </p>
                            </div>
                            <div className="chat-scheduler-actions">
                                <button type="submit" className="btn btn-primary btn-sm">Save schedule</button>
                                <button
                                    type="button"
                                    className="btn btn-outline-dark btn-sm"
                                    onClick={() => {
                                        setScheduleDraft({
                                            type: 'meeting',
                                            title: '',
                                            date: '',
                                            time: '',
                                            mode: 'online',
                                            location: '',
                                            reminder: '15 minutes before',
                                            note: ''
                                        })
                                        setScheduleSaved(false)
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                            {scheduleSaved && (
                                <div className="chat-scheduler-success">
                                    Schedule draft saved. You can connect this form to backend later to create real invites.
                                </div>
                            )}
                        </form>
                    </div>
                )}
                <div className="chat-info-section">
                    <div className="chat-info-section-title">About</div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item text-center">{details.bio || "bio"}</li>
                        <li className="list-group-item text-center">{details.email || "email"}</li>
                        <li className="list-group-item text-center">{membersCount || "members"}</li>
                    </ul>
                </div>
            </div>
            <ViewProfile trigger={viewprofile} details={details} setViewProfile={setViewProfile} />
        </div>
    )
}
