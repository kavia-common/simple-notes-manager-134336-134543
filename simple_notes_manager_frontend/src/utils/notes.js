import { nanoid } from './uuid';

/**
 * PUBLIC_INTERFACE
 * Create a new blank note object with defaults.
 */
export function createBlankNote() {
  const now = Date.now();
  return {
    id: nanoid(),
    title: '',
    content: '',
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * PUBLIC_INTERFACE
 * Sort notes by updatedAt (desc).
 */
export function sortNotesByUpdatedAt(notes) {
  return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * PUBLIC_INTERFACE
 * Filter notes by query across title and content (case-insensitive).
 */
export function filterNotes(notes, query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(n =>
    (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q)
  );
}

/**
 * PUBLIC_INTERFACE
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text, max = 80) {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1) + '…';
}
