const fs = require("fs");
const util = require("util");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// this package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require("uuid");

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("db/db.jason",JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // if notes isn't array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes

        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new error ("Note 'title' and 'text' cannot be blank");
        }

        // Add a unique id to the note using uuid package
        const newNote = { title, text, id: uuidv1() };
        
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote);

    }

    removeNote(id) {
        // Get all notes, remove the note with the given id, write the filtered notes
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }

}

module.exports = new Store();
