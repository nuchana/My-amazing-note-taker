const fs = require("fs");
const path = require("path");
const app = require("express").Router();


// Basic route that sends the user first to the AJAX Page
app.get("/api/notes", function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    // let saveNotes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    console.log(savedNotes)
    res.json(savedNotes[Number(req.params.id)]);
});

// every new note saved is given an ID equal to its position in the array to start.
app.post("/api/notes", function (req, res) {
    console.log(res)
    // Note the code here. Our "server" will respond to requests and let users save notes.
    // req.body is available since we're using the body parsing middleware
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueId = (savedNotes.length).toString();
    newNote.id = uniqueId;
    savedNotes.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    console.log("Note saved to db.json. Content: ", newNote);
    res.json(savedNotes);

});

// Remove a note using my unique IDs was to use a filter that would return an array with every entry except the entry I was looking for.
app.delete("/api/notes/:id", function (req, res) {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != noteID;
    })

    for (currNote of savedNotes) {
        currNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

module.exports = app;


