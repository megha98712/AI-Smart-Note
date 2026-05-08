// Local Storage aur State Management
let notes = JSON.parse(localStorage.getItem('ai-notes')) || [];
let currentNoteId = null;

const notesList = document.getElementById('notes-list');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const saveBtn = document.getElementById('save-note');
const newNoteBtn = document.getElementById('new-note-btn');
const summarizeBtn = document.getElementById('ai-summarize');

// 1. Initial Render
function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${note.title || 'Untitled'}</strong><br><small>${note.date}</small>`;
        li.onclick = () => loadNote(note.id);
        notesList.appendChild(li);
    });
}

// 2. Save Note
function saveNote() {
    if (!noteTitle.value && !noteContent.value) return;

    const noteData = {
        id: currentNoteId || Date.now(),
        title: noteTitle.value,
        content: noteContent.value,
        date: new Date().toLocaleDateString()
    };

    if (currentNoteId) {
        const index = notes.findIndex(n => n.id === currentNoteId);
        notes[index] = noteData;
    } else {
        notes.push(noteData);
        currentNoteId = noteData.id;
    }

    localStorage.setItem('ai-notes', JSON.stringify(notes));
    renderNotes();
    alert("Note Saved!");
}

// 3. Load Note
function loadNote(id) {
    const note = notes.find(n => n.id === id);
    currentNoteId = note.id;
    noteTitle.value = note.title;
    noteContent.value = note.content;
}

// 4. AI Function (Simulated)
async function callAI() {
    const text = noteContent.value;
    if (!text) return alert("Kuch likho toh sahi!");

    document.getElementById('ai-status').innerText = "AI is thinking...";
    
    // Yahan aap asli OpenAI API call kar sakte hain. 
    // Filhaal hum ek "Smart Summary" simulate kar rahe hain.
    setTimeout(() => {
        const summary = "AI SUMMARY:\n" + text.substring(0, 50) + "... [Refined by AI]";
        noteContent.value = summary + "\n\n---\n\n" + text;
        document.getElementById('ai-status').innerText = "AI task complete.";
    }, 1500);
}

// Event Listeners
saveBtn.addEventListener('click', saveNote);
newNoteBtn.addEventListener('click', () => {
    currentNoteId = null;
    noteTitle.value = '';
    noteContent.value = '';
});
summarizeBtn.addEventListener('click', callAI);

// Pehli baar notes load karne ke liye
renderNotes();