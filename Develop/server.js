const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("./notes", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/notes.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});


// New notes added to the request body and adds them to the db.json, then returns the new notes to the client to view
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
  
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    notes.push(newNote);
  
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
  
    res.json(newNote);
});
  

//DELETE NOTES FUNCTION

app.delete('/api/notes/:id', (req, res) => {
  const noteId = notes.filter((note) =>
    note.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteID));
  fs.readFile.json(noteId);
});
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
