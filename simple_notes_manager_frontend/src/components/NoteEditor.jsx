import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteEditor allows editing of title and content of the active note.
 */
function NoteEditor({ note, onChange, onDelete }) {
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');

  // Sync when note changes (switching active note)
  useEffect(() => {
    setTitle(note.title || '');
    setContent(note.content || '');
  }, [note.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Debounce-like simple update on change
    const updated = { ...note, title, content };
    onChange(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  return (
    <section className="editor" aria-label="Note editor">
      <div className="editor-row">
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Note title"
        />
        <button className="btn btn-danger" onClick={onDelete} aria-label="Delete current note">
          Delete
        </button>
      </div>
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Note content"
      />
      <div className="muted">Last updated: {new Date(note.updatedAt).toLocaleString()}</div>
    </section>
  );
}

export default NoteEditor;
