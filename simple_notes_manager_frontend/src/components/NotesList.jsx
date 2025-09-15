import React from 'react';
import { truncate } from '../utils/notes';

/**
 * PUBLIC_INTERFACE
 * NotesList shows a list of notes with title, snippet and updated time.
 */
function NotesList({ notes, activeId, onSelect, onDelete }) {
  if (notes.length === 0) {
    return <div className="list" aria-live="polite">No notes. Create your first note!</div>;
  }

  return (
    <div className="list" role="list" aria-label="Notes list">
      {notes.map((n) => (
        <article
          key={n.id}
          className={`note-item ${activeId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
          role="listitem"
          aria-current={activeId === n.id ? 'true' : 'false'}
        >
          <div>
            <h4 className="note-title">{n.title || 'Untitled'}</h4>
            <div className="note-meta">
              {truncate(n.content || '', 80)} • {new Date(n.updatedAt).toLocaleString()}
            </div>
          </div>
          <div className="note-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(n.id)}
              aria-label={`Delete ${n.title || 'Untitled'}`}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default NotesList;
