const path = require("path");
const router = require("express").Router();

// GET "/api/notes" respond with all notes from the database
router.get("/notes", (req, res) => {
    store 
    .getNotes()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(500).json(err));
});
// POST "/api/notes" to write a new note
router.post("/notes", (req, res) => {
    store 
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", (req, res) => {
    store 
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
})

module.exports = router;


