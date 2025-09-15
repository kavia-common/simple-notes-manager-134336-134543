import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import Navbar from './components/Navbar';
import EmptyState from './components/EmptyState';
import { loadNotes, saveNotes } from './utils/storage';
import { createBlankNote, filterNotes, sortNotesByUpdatedAt } from './utils/notes';

// PUBLIC_INTERFACE
function App() {
  /**
   * Notes Manager App - allows users to create, view, edit, and delete notes.
   * Notes are persisted in localStorage. UI offers a notes list, editor, and search.
   */
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load notes on first render
  useEffect(() => {
    const initial = loadNotes();
    setNotes(initial);
    if (initial.length > 0) {
      setActiveId(initial[0].id);
    }
  }, []);

  // Persist notes on change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const sortedNotes = useMemo(() => sortNotesByUpdatedAt(notes), [notes]);
  const visibleNotes = useMemo(() => filterNotes(sortedNotes, query), [sortedNotes, query]);
  const activeNote = useMemo(() => notes.find(n => n.id === activeId) || null, [notes, activeId]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  const handleCreate = () => {
    const newNote = createBlankNote();
    setNotes(prev => [newNote, ...prev]);
    setActiveId(newNote.id);
  };

  // PUBLIC_INTERFACE
  const handleSelect = (id) => {
    setActiveId(id);
  };

  // PUBLIC_INTERFACE
  const handleDelete = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeId === id) {
      const remaining = notes.filter(n => n.id !== id);
      setActiveId(remaining[0]?.id || null);
    }
  };

  // PUBLIC_INTERFACE
  const handleUpdate = (updated) => {
    setNotes(prev =>
      prev.map(n => (n.id === updated.id ? { ...updated, updatedAt: Date.now() } : n))
    );
  };

  return (
    <div className="App">
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        query={query}
        onQueryChange={setQuery}
        onCreate={handleCreate}
      />
      <div className="layout">
        <aside className="sidebar">
          <NotesList
            notes={visibleNotes}
            activeId={activeId}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </aside>
        <main className="content">
          {activeNote ? (
            <NoteEditor
              key={activeNote.id}
              note={activeNote}
              onChange={handleUpdate}
              onDelete={() => handleDelete(activeNote.id)}
            />
          ) : (
            <EmptyState onCreate={handleCreate} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
