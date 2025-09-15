import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Navbar component provides app branding, search input, create note button, and theme toggle.
 */
function Navbar({ theme, onToggleTheme, query, onQueryChange, onCreate }) {
  return (
    <header className="navbar" role="banner">
      <div className="brand" aria-label="Simple Notes Manager">📝 Notes</div>
      <div className="toolbar" role="toolbar" aria-label="Notes actions">
        <input
          className="input"
          type="search"
          placeholder="Search notes…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
        <button className="btn btn-primary" onClick={onCreate} aria-label="Create note">
          + New
        </button>
        <button
          className="btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
