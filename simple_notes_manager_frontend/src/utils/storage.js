const STORAGE_KEY = 'simple-notes-manager/notes:v1';

/**
 * PUBLIC_INTERFACE
 * Load notes from localStorage, with validation and defaulting to empty list.
 */
export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Validate basic shape
    return parsed
      .filter(n => n && typeof n === 'object')
      .map(n => ({
        id: String(n.id || ''),
        title: String(n.title || ''),
        content: String(n.content || ''),
        createdAt: Number(n.createdAt || Date.now()),
        updatedAt: Number(n.updatedAt || Date.now()),
      }));
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Save notes array into localStorage.
 */
export function saveNotes(notes) {
  try {
    const clean = Array.isArray(notes) ? notes : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {
    // no-op: localStorage might be unavailable
  }
}
