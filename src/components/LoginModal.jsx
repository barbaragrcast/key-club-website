import { useState } from 'react';
import { WEBMASTER_CREDENTIALS } from '../data/mockData';

function memberPassword(member) {
  return `${member.firstName}${member.lastName[0]}keyclub`;
}

export default function LoginModal({ members, onMemberLogin, onWebmasterLogin, onClose }) {
  const [tab, setTab] = useState('member');
  const [selectedId, setSelectedId] = useState('');
  const [memberPass, setMemberPass] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleMemberLogin() {
    if (!selectedId) { setError('Please select your name.'); return; }
    const member = members.find(m => m.id === Number(selectedId));
    if (!member) return;
    if (memberPass !== memberPassword(member)) {
      setError('Incorrect password. Your password is your first name + last initial + keyclub (e.g. SofiaMkeyclub).');
      return;
    }
    onMemberLogin(member);
  }

  function handleWebmasterLogin() {
    if (username === WEBMASTER_CREDENTIALS.username && password === WEBMASTER_CREDENTIALS.password) {
      onWebmasterLogin();
    } else {
      setError('Incorrect username or password.');
    }
  }

  function switchTab(t) {
    setTab(t);
    setError('');
    setSelectedId('');
    setMemberPass('');
    setUsername('');
    setPassword('');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Log In</h2>

        <div className="modal-tabs">
          <button
            className={`modal-tab${tab === 'member' ? ' active' : ''}`}
            onClick={() => switchTab('member')}
          >
            Member
          </button>
          <button
            className={`modal-tab${tab === 'webmaster' ? ' active' : ''}`}
            onClick={() => switchTab('webmaster')}
          >
            Webmaster
          </button>
        </div>

        {tab === 'member' && (
          <div className="modal-body">
            <p className="modal-desc">Select your name and enter your password to log in.</p>

            <label className="form-label">Your Name</label>
            <select
              className="form-select"
              value={selectedId}
              onChange={e => { setSelectedId(e.target.value); setError(''); }}
            >
              <option value="">— Select your name —</option>
              {[...members]
                .sort((a, b) => a.lastName.localeCompare(b.lastName))
                .map(m => (
                  <option key={m.id} value={m.id}>
                    {m.lastName}, {m.firstName} — Grade {m.grade}
                  </option>
                ))
              }
            </select>

            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={memberPass}
              onChange={e => { setMemberPass(e.target.value); setError(''); }}
              placeholder="Your password"
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && handleMemberLogin()}
            />
            <p className="password-hint">
              Your password is: <strong>FirstName + LastInitial + keyclub</strong><br />
              Example: All Davenport → <code>AllDkeyclub</code>
            </p>

            {error && <p className="form-error">{error}</p>}
            <button className="btn-primary full-width" onClick={handleMemberLogin}>
              Log In
            </button>
          </div>
        )}

        {tab === 'webmaster' && (
          <div className="modal-body">
            <p className="modal-desc">Webmaster access allows editing meeting info and member records.</p>
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Username"
              autoComplete="username"
            />
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Password"
              autoComplete="current-password"
              onKeyDown={e => e.key === 'Enter' && handleWebmasterLogin()}
            />
            {error && <p className="form-error">{error}</p>}
            <button className="btn-primary full-width" onClick={handleWebmasterLogin}>
              Log In as Webmaster
            </button>
            <p className="demo-hint">Demo credentials: webmaster / keyclub2026</p>
          </div>
        )}
      </div>
    </div>
  );
}
