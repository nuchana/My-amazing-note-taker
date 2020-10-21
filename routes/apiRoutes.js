const fs = require("fs");


module.exports = function (app) {
   
    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "/../db/db.json"));
    });
    
    app.get("/api/notes/:id", function(req, res) {
        let savedNotes = JSON.parse(fs.readFileSync("/../db/db.json", "utf8"));
        res.json(savedNotes[Number(req.params.id)]);
    });

    

// ========================================================

    app.get("/api/notes", (req, res) => {
        // store
        // .getNotes()
       console.log(__dirname)
        fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, notes) {
            if (err) {
                throw err;
            }

            // Parse the JSON string to an object
            const dbJSON = JSON.parse(notes);
            res.json(dbJSON); 
        });
    })

        // API POST Requests
        // Below code handles when a user submits a form and thus submits data to the server.
        // In each of the below cases, when a user submits form data (a JSON object)
        // ...the JSON is pushed to the appropriate JavaScript array
//         app.get("/api/notes", (req, res) => {
//             // store
//             // .getNotes()
//            console.log(__dirname)
//             fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, notes) {
//                 if (err) {
//                     throw err;
//                 }
    
//                 // Parse the JSON string to an object
//                 const dbJSON = JSON.parse(notes);
//                 res.json(dbJSON); 
//             });

//         })

//         app.post("/api/notes", (req, res) => {
//             // store
            
//             fs.readFile(__dirname + "/../db/db.json", "utf8", function (err, notes) {
//                 if (err) {
//                     throw err;
//                 }
    
//                 // Parse the JSON string to an object
//                 const dbJSON = JSON.parse(notes);
//                 dbJSON.push(req.body)
//                 // convert to string writeFile
//                 res.json(dbJSON); 
//             });
//         })
