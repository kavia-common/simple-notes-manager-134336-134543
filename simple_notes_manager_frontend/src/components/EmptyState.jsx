import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState appears when no note is selected or exists.
 */
function EmptyState({ onCreate }) {
  return (
    <div className="empty" role="status" aria-live="polite">
      <h2>Welcome to Notes</h2>
      <p>Create, edit, and organize your thoughts quickly.</p>
      <button className="btn btn-primary" onClick={onCreate} aria-label="Create your first note">
        Create your first note
      </button>
    </div>
  );
}

export default EmptyState;
