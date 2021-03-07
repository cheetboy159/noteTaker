const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;
const saveNotes = path.join(__dirname, "/public");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//   * GET`/notes` - Should return the`notes.html` file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(saveNotes, "notes.html"));
});
//   * GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/api/notes/:id", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
});
//   * GET`*` - Should return the`index.html` file
app.get("*", (req, res) => {
    res.sendFile(path.join(saveNotes, "index.html"));
});
app.post("/api/notes", (req, res) => {
//   * GET`/api/notes` - Should read the`db.json` file and return all saved notes as JSON.
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let note = req.body;
    let ID = (savedNotes.length).toString();
    note.id = ID;
    savedNotes.push(note);
    //   * The application should have a`db.json` file on the backend that will be used to store and retrieve notes using the`fs` module.
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
//   * DELETE`/api/notes/:id` - Should receive a query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", (req, res) => {
//   In order to delete a note, you'll need to read all notes from the `db.json` file, 
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let ID = req.params.id;
    let incID = 0;
    savedNotes = savedNotes.filter(currNote => {
        return currNote.id != ID;
    })
//   This means you'll need to find a way to give each note a unique `id` when it's saved.
    for (currNote of savedNotes) {
        currNote.id = incID.toString();
        incID++;
    }
//   remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
})
// PORT listner
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})