document.addEventListener('DOMContentLoaded', function () {
    const addNoteButton = document.getElementById('add-note');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');
    let notes = loadNotes();

    addNoteButton.addEventListener('click', addNote);
    notesList.addEventListener('click', deleteNote);


    function addNote() {
        const content = noteContent.value.trim();
        let fechaActual = new Date();
        if (content === '') {
            alert('La nota no puede estar vacía');
            return;
        }

        const note = document.createElement('div');
        note.id = generate_id();
        note.classList.add('note');
        note.innerHTML = `
            <p>${content}</p>
            <p>${fechaActual}</p>
            <button class="delete-note">Borrar</button>
        `;
        notesList.appendChild(note);
        noteContent.value = '';
        let nuevaNota = {
            texto: content,
            fecha: fechaActual,
            id: note.id
        }
        notes.push(nuevaNota)
        saveNotes();
    }

    function generate_id() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function deleteNote(e) {
        if (e.target.classList.contains('delete-note')) {
            const note = e.target.parentElement;
            const note_id = note.id;
            notes = notes.filter(elemento => elemento.id != note_id);
            notesList.removeChild(note);
            saveNotes();
        }
    }

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        var notes = [];
        if (savedNotes) {
            notes = JSON.parse(savedNotes);
            notes.forEach(noteContent => {
                const note = document.createElement('div');
                note.id = noteContent.id;
                note.classList.add('note');
                note.innerHTML = `
                    <p>${noteContent.texto}</p>
                    <p>${noteContent.fecha}</p>
                    <button class="delete-note">Borrar</button>
                `;
                notesList.appendChild(note);
            });
        }
        return notes;
    }
});
