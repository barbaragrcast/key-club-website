export default function Navbar({ page, setPage, currentUser, onLoginClick, onLogout }) {
  return (
    <nav className="navbar">
      <button className="navbar-brand" onClick={() => setPage('home')}>
        <span className="navbar-logo">🔑</span>
        <span className="navbar-title">Key Club</span>
      </button>

      <div className="navbar-links">
        <button className={`nav-link${page === 'home' ? ' active' : ''}`} onClick={() => setPage('home')}>
          Home
        </button>
        <button className={`nav-link${page === 'officers' ? ' active' : ''}`} onClick={() => setPage('officers')}>
          Officers
        </button>
        <button className={`nav-link${page === 'members' ? ' active' : ''}`} onClick={() => setPage('members')}>
          Members
        </button>
        {currentUser?.type === 'webmaster' && (
          <button className={`nav-link admin-link${page === 'webmaster' ? ' active' : ''}`} onClick={() => setPage('webmaster')}>
            ⚙ Admin
          </button>
        )}
      </div>

      <div className="navbar-auth">
        {currentUser ? (
          <div className="navbar-user">
            <span className="navbar-user-name">
              {currentUser.type === 'webmaster' ? '⚙ Webmaster' : `👤 ${currentUser.name}`}
            </span>
            <button className="btn-logout" onClick={onLogout}>Log Out</button>
          </div>
        ) : (
          <button className="btn-login" onClick={onLoginClick}>Log In</button>
        )}
      </div>
    </nav>
  );
}
