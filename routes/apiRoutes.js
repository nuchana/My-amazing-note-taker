const fs = require("fs");


module.exports = function (app) {
    // Basic route that sends the user first to the AJAX Page
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });

    app.get("/api/notes/:id", function (req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        res.json(savedNotes[Number(req.params.id)]);
    });

    app.post("/api/notes", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        let saveNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        let newNote = req.body;
        let uniqueId = (saveNotes.length).toString();
        newNote.id = uniqueId;
        saveNotes.push(newNote);

    });

    app.delete("/api/notes/:id", function (req, res){
        let saveNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        let noteId = res.params.id;
        let newId = 0;
        console.log(`Deleting note with ID ${noteId}`);
        savedNotes = savedNotes.filter(currentNote => {
            return currentNote.id !== noteId;
        })

        for (currentNote of saveNotes) {
            currentNote.id = newID.toString();
            newId++;

        }
        fs.writeFileSync("../db/db.json", JSON.stringify(saveNotes));
        res.json(saveNotes);

    })

    // ========================================================

    // app.get("/api/notes", (req, res) => {
    //     // store
    //     // .getNotes()
    //     console.log(__dirname)
    //     fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, notes) {
    //         if (err) {
    //             throw err;
    //         }

    //         // Parse the JSON string to an object
    //         const dbJSON = JSON.parse(notes);
    //         res.json(dbJSON);
    //     });
    // });
}
       