const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 8080;
const saveNotes = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(saveNotes, "notes.html"));
});
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(saveNotes, "index.html"));
});
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let note = req.body;
    let ID = (savedNotes.length).toString();
    note.id = ID;
    savedNotes.push(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
app.delete("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let ID = req.params.id;
    let incID = 0;
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != ID;
    })
    for (currNote of savedNotes) {
        currNote.id = incID.toString();
        incID++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})

app.listen(port, function () {
    console.log(`Listening on port: ${port}`);
})
// Create an application that can be used to write, save, and delete notes.
// This application will use an express backend and save and retrieve note data from a JSON file.

// * The application frontend has already been created, it's your job to build the backend and connect the two.

//     * The following HTML routes should be created:

//   * GET`/notes` - Should return the`notes.html` file.

//   * GET`*` - Should return the`index.html` file

//     * The application should have a`db.json` file on the backend that will be used to store and retrieve notes using the`fs` module.

// * The following API routes should be created:

//   * GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.

//   * POST`/api/notes` - Should receive a new note to save on the request body, add it to the`db.json` file, and then return the new note to the client.

//   * DELETE`/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
//   This means you'll need to find a way to give each note a unique `id` when it's saved.
//   In order to delete a note, you'll need to read all notes from the `db.json` file, 
//   remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.