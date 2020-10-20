// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// const express = require("express");
const store = require("../db/store");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    // Display all 

    app.get("/api/notes", (req, res) => {
        store
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
  

    app.post("/api/notes", function (req, res) {
        
        store
        .addNote(req.body) // why addNote? is it a function?
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));

    });

    // remove the note with the given id property, and then rewrite the notes to the db.json file
    app.delete("/api/notes/:id", function (req, res) {
        store
        .removeNote(req.params.id)
        .then(() => res.json({ok: true}))
        .catch((err) => res.status(500).json(err));

        // var chosenID = req.params.savedNotesData

        // console.log(chosenID)

        // for (var i = 0; i < savedNotesData.length; i++) {
        //     if (chosenID === savedNotesData[i].id) {
        //         res.json(savedNotesData[i]);
        //     }
        // }
            
        //     return res.json(false);

    });

    
};
