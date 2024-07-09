document.addEventListener('DOMContentLoaded', function () {
    const addNoteButton = document.getElementById('add-note');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');

    addNoteButton.addEventListener('click', addNote);
    notesList.addEventListener('click', deleteNote);

    loadNotes();

    function addNote() {
        const content = noteContent.value.trim();
        if (content === '') {
            alert('La nota no puede estar vacía');
            return;
        }

        const note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <p>${content}</p>
            <button class="delete-note">Borrar</button>
        `;
        notesList.appendChild(note);
        noteContent.value = '';

        saveNotes();
    }

    function deleteNote(e) {
        if (e.target.classList.contains('delete-note')) {
            const note = e.target.parentElement;
            notesList.removeChild(note);
            saveNotes();
        }
    }

    function saveNotes() {
        const notes = [];
        notesList.querySelectorAll('.note p').forEach(note => {
            notes.push(note.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            notes.forEach(noteContent => {
                const note = document.createElement('div');
                note.classList.add('note');
                note.innerHTML = `
                    <p>${noteContent}</p>
                    <button class="delete-note">Borrar</button>
                `;
                notesList.appendChild(note);
            });
        }
    }
});
