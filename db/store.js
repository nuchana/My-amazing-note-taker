// Helper functions to be used for read() and write() that we made to deal with asynchoronicity problems.

const util = require("util");
const fs = require("fs");

// this package will be used to help create unique id. 
const uuidv1 = require("uuidv1") // npm install uuid

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsyc = util.promisify(fs.writeFile);

class Store { 
    read(){
        return readFileAsync("db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsyc("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then ((notes) => {

            let parsedNotes;
            // if notes isn't an array or can't be turned into one, send back a new empty array

            try {
                parsedNotes = [].concat(JSON.parse(notes));

            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;

        });

    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error ("Note 'title and 'text' cannot be blank.");
        }

        // Add a unique id to the note using uuid package
        const newNote = { title, text, id: uuidv1() };
        // Get all notes, add the new note, write all the updated notes, return the new note
        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)

    }

    removeNote(id) {
        //Get all notes, remove the note with the given id, write the filtered notes
        return this.getNotes()
        .then((notes) = notes.filter((note) => note.id !==id))
        .then((filteredNotes) = this.write(filteredNotes));
    }

    

}
module.exports = new Store();