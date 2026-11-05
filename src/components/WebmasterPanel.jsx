import { useState } from 'react';

export default function WebmasterPanel({ members, meeting, meetingActive, onToggleMeeting, onUpdateMeeting, onUpdateMember, onAddMember }) {
  const [meetingForm, setMeetingForm] = useState({ ...meeting });
  const [meetingSaved, setMeetingSaved] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editHours, setEditHours] = useState('');
  const [editPoints, setEditPoints] = useState('');
  const [newMember, setNewMember] = useState({ firstName: '', lastName: '', grade: '' });
  const [addError, setAddError] = useState('');

  function saveMeeting() {
    onUpdateMeeting(meetingForm);
    setMeetingSaved(true);
    setTimeout(() => setMeetingSaved(false), 2000);
  }

  function startEdit(member) {
    setEditingId(member.id);
    setEditHours(member.hours);
    setEditPoints(member.points);
  }

  function saveEdit(id) {
    const hours = parseFloat(editHours);
    const points = parseInt(editPoints, 10);
    if (isNaN(hours) || isNaN(points)) return;
    onUpdateMember(id, { hours, points });
    setEditingId(null);
  }

  function handleAddMember() {
    const { firstName, lastName, grade } = newMember;
    if (!firstName.trim() || !lastName.trim() || !grade) {
      setAddError('All fields are required.');
      return;
    }
    onAddMember({ firstName: firstName.trim(), lastName: lastName.trim(), grade: Number(grade) });
    setNewMember({ firstName: '', lastName: '', grade: '' });
    setAddError('');
  }

  return (
    <main className="page">
      <section className="page-header">
        <div className="section-label">Admin</div>
        <h2 className="section-heading">Webmaster Panel</h2>
      </section>

      <div className="admin-grid">
        {/* Meeting Management */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Meeting Settings</h3>
            <button
              className={`toggle-btn ${meetingActive ? 'on' : 'off'}`}
              onClick={onToggleMeeting}
            >
              {meetingActive ? '🟢 Meeting Active' : '⚫ Meeting Inactive'}
            </button>
          </div>
          <p className="admin-card-desc">
            Toggle meeting active to open attendance sign-in for members.
          </p>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" value={meetingForm.date} onChange={e => setMeetingForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Time</label>
              <input className="form-input" value={meetingForm.time} onChange={e => setMeetingForm(f => ({ ...f, time: e.target.value }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-input" value={meetingForm.location} onChange={e => setMeetingForm(f => ({ ...f, location: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Meeting Title</label>
            <input className="form-input" value={meetingForm.title} onChange={e => setMeetingForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows={3} value={meetingForm.description} onChange={e => setMeetingForm(f => ({ ...f, description: e.target.value }))} />
          </div>
          <button className="btn-primary" onClick={saveMeeting}>
            {meetingSaved ? '✓ Saved!' : 'Save Meeting Info'}
          </button>
        </div>

        {/* Member Management */}
        <div className="admin-card">
          <h3 className="admin-card-title">Member Records</h3>
          <p className="admin-card-desc">Edit hours and points for individual members.</p>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Hours</th>
                  <th>Points</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[...members].sort((a, b) => a.lastName.localeCompare(b.lastName)).map(member => (
                  <tr key={member.id}>
                    <td>{member.firstName} {member.lastName}</td>
                    <td>{member.grade}</td>
                    <td>
                      {editingId === member.id
                        ? <input className="inline-input" type="number" step="0.5" min="0" value={editHours} onChange={e => setEditHours(e.target.value)} />
                        : member.hours.toFixed(1)
                      }
                    </td>
                    <td>
                      {editingId === member.id
                        ? <input className="inline-input" type="number" min="0" value={editPoints} onChange={e => setEditPoints(e.target.value)} />
                        : member.points
                      }
                    </td>
                    <td>
                      {editingId === member.id
                        ? <button className="btn-save-inline" onClick={() => saveEdit(member.id)}>Save</button>
                        : <button className="btn-edit-inline" onClick={() => startEdit(member)}>Edit</button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Member */}
        <div className="admin-card">
          <h3 className="admin-card-title">Add New Member</h3>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" value={newMember.firstName} onChange={e => setNewMember(f => ({ ...f, firstName: e.target.value }))} placeholder="First name" />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" value={newMember.lastName} onChange={e => setNewMember(f => ({ ...f, lastName: e.target.value }))} placeholder="Last name" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Grade</label>
            <select className="form-select" value={newMember.grade} onChange={e => setNewMember(f => ({ ...f, grade: e.target.value }))}>
              <option value="">Select grade</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
            </select>
          </div>
          {addError && <p className="form-error">{addError}</p>}
          <button className="btn-primary" onClick={handleAddMember}>Add Member</button>
        </div>
      </div>
    </main>
  );
}
