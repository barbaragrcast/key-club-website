import { useState } from 'react';

const RANK_LABELS = ['🥇', '🥈', '🥉'];

export default function MembersPage({ members, currentUser, meetingActive, onSignIn }) {
  const [search, setSearch] = useState('');

  const sorted = [...members].sort((a, b) => b.points - a.points);
  const filtered = sorted.filter(m =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="page">
      <section className="page-header">
        <div className="page-header-row">
          <div>
            <div className="section-label">Roster</div>
            <h2 className="section-heading">Members</h2>
          </div>
          <div className={`meeting-status-badge ${meetingActive ? 'active' : 'inactive'}`}>
            <span className="status-dot" />
            {meetingActive ? 'Meeting in Progress' : 'No Active Meeting'}
          </div>
        </div>
        {!currentUser && (
          <p className="members-hint">Log in to sign in for attendance during a meeting.</p>
        )}
        {currentUser?.type === 'member' && !meetingActive && (
          <p className="members-hint">Attendance sign-in opens when a meeting starts.</p>
        )}
      </section>

      <section className="members-section">
        <div className="members-toolbar">
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          <span className="members-count">{filtered.length} member{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="table-wrapper">
          <table className="members-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Hours</th>
                <th>Points</th>
                <th>Meetings</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, idx) => {
                const globalRank = sorted.findIndex(m => m.id === member.id);
                const isCurrentUser = currentUser?.type === 'member' && currentUser.id === member.id;
                const attendancePct = member.totalMeetings > 0
                  ? Math.round((member.attendanceCount / member.totalMeetings) * 100)
                  : 0;

                return (
                  <tr key={member.id} className={isCurrentUser ? 'my-row' : ''}>
                    <td className="rank-cell">
                      {globalRank < 3
                        ? <span className="rank-medal">{RANK_LABELS[globalRank]}</span>
                        : <span className="rank-num">#{globalRank + 1}</span>
                      }
                    </td>
                    <td>
                      <div className="name-cell">
                        <span className="member-name">
                          {member.firstName} {member.lastName}
                        </span>
                        {isCurrentUser && <span className="you-badge">You</span>}
                      </div>
                    </td>
                    <td>{member.grade}th</td>
                    <td className="hours-cell">{member.hours.toFixed(1)} hrs</td>
                    <td className="points-cell">
                      <span className="points-badge">{member.points} pts</span>
                    </td>
                    <td>
                      <span className={`attendance-fraction ${attendancePct >= 80 ? 'high' : attendancePct >= 50 ? 'mid' : 'low'}`}>
                        {member.attendanceCount}/{member.totalMeetings}
                      </span>
                    </td>
                    <td className="action-cell">
                      {isCurrentUser && meetingActive && !member.signedInToday && (
                        <button className="btn-sign-in" onClick={() => onSignIn(member.id)}>
                          Sign In
                        </button>
                      )}
                      {isCurrentUser && member.signedInToday && (
                        <span className="signed-in-badge">✓ Signed In</span>
                      )}
                      {isCurrentUser && meetingActive === false && (
                        <span className="no-meeting-text">—</span>
                      )}
                      {!isCurrentUser && (
                        <span className="no-meeting-text">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="points-legend">
          <span className="legend-label">Points breakdown:</span>
          <span>1 meeting attended = +3 pts</span>
          <span>1 service hour = +2 pts</span>
        </div>
      </section>
    </main>
  );
}
