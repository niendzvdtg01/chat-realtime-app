import '../../styles/dashboard/chatinfo.scss'
import userHeadr from '../../assets/dashboard/UsserHeader.png'
import { ViewProfile } from '../ViewProfile/ViewProfile'
import { useContext, useState } from 'react'
import { UserContext } from '../../services/UserService/UserContext'
export const ChatInfo = (props) => {
    const context = useContext(UserContext)
    const [viewprofile, setViewProfile] = useState(false)
    const [showScheduler, setShowScheduler] = useState(false)
    const [scheduleSaved, setScheduleSaved] = useState(false)
    const [scheduleError, setScheduleError] = useState('')
    const [scheduleDraft, setScheduleDraft] = useState({
        type: 'meeting',
        title: '',
        date: '',
        time: '',
        notes: ''
    })
    const details = props.details
    const conversationId = props.conversationId
    const scheduleLoading = context?.loadingByAction?.createCalendar > 0

    const calendar = props.calendar;

    const targetName = details.firstName || details.name || "this chat"
    const membersCount = Array.isArray(details.members) ? details.members.length : 0

    const handleDraftChange = (event) => {
        const { name, value } = event.target
        setScheduleSaved(false)
        setScheduleError('')
        setScheduleDraft((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleScheduleSubmit = async (event) => {
        event.preventDefault()

        if (!conversationId) {
            setScheduleSaved(false)
            setScheduleError('Hay chon mot cuoc tro chuyen truoc khi tao lich.')
            return
        }

        if (!scheduleDraft.title.trim() || !scheduleDraft.date || !scheduleDraft.time) {
            setScheduleSaved(false)
            setScheduleError('Vui long nhap day du title, date va time.')
            return
        }

        const result = await context.handleCreateCalendar({
            conversationId,
            type: scheduleDraft.type,
            title: scheduleDraft.title.trim(),
            date: scheduleDraft.date,
            time: scheduleDraft.time,
            notes: scheduleDraft.notes.trim()
        })

        if (!result.success) {
            setScheduleSaved(false)
            setScheduleError('Khong gui duoc thong tin lich xuong backend.')
            return
        }

        setScheduleError('')
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
                                <label className="chat-field chat-field-wide ">
                                    <span>Type</span>
                                    <select name="type" value={scheduleDraft.type} onChange={handleDraftChange}>
                                        <option value="meeting">Meeting</option>
                                        <option value="event">Event</option>
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
                                        name="notes"
                                        rows="3"
                                        value={scheduleDraft.notes}
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
                                    <span>{scheduleDraft.type}</span>
                                </div>
                                <p>
                                    For {targetName} {membersCount > 0 ? `and ${membersCount} members` : ''}.
                                </p>
                            </div>
                            <div className="chat-scheduler-actions">
                                <button type="submit" className="btn btn-primary btn-sm" disabled={scheduleLoading}>
                                    {scheduleLoading ? 'Sending...' : 'Save schedule'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-dark btn-sm"
                                    onClick={() => {
                                        setScheduleDraft({
                                            type: 'meeting',
                                            title: '',
                                            date: '',
                                            time: '',
                                            notes: ''
                                        })
                                        setScheduleSaved(false)
                                        setScheduleError('')
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                            {scheduleSaved && (
                                <div className="chat-scheduler-success">
                                    Schedule info da duoc gui xuong backend.
                                </div>
                            )}
                            {scheduleError && (
                                <div className="chat-scheduler-success text-danger">
                                    {scheduleError}
                                </div>
                            )}
                        </form>
                        <div className="chat-scheduler-grid">
                            <label className="chat-field chat-field-wide ">
                                {conversationId && calendar && (
                                    <div>
                                        <span>Your calendar</span>
                                        <div className='chat-field chat-field-wide'>
                                            {calendar.message && (
                                                <div>{calendar.message}</div>
                                            )}
                                            {calendar.next_question && (
                                                <div>{calendar.next_question}</div>
                                            )}
                                            {calendar.meet_link && (
                                                <a href={calendar.meet_link} target="_blank" rel="noreferrer">
                                                    {calendar.meet_link}
                                                </a>
                                            )}
                                            {Array.isArray(calendar.items) && calendar.items.length > 0 && (
                                                <div>
                                                    {calendar.items.map((item, index) => (
                                                        <button key={index}>
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {Array.isArray(calendar.missing_fields) && calendar.missing_fields.length > 0 && (
                                                <div>
                                                    Missing: {calendar.missing_fields.join(", ")}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </label>
                        </div>
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
