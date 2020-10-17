// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var newNotesData = require("../data/newNotes");
var savedNotesData = require("../data/savedNotes");


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

    app.get("/api/notes", function (req, res) {
        return res.json(savedNotesData);
    });

    // Display a single noteID, or return false
    //

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware

        newNotesData.push(req.body);
        return res.json(newNotesData);

    });

    app.delete("/api/notes", function (req, res) {

        var chosenID = req.params.savedNotesData

        console.log(chosenID)

        for (var i = 0; i < savedNotesData.length; i++) {
            if (chosenID === savedNotesData[i].noteID) {
                res.json(savedNotesData[i]);
            }
        }
            // remove the note with the given id property, and then
            // rewrite the notes to the db.json file
            return res.json(false);



    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        newNotesData.length = 0;


        res.json({ ok: true });
    });
};
