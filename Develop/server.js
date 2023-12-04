const express = require("express");
const path = require("path");
const uuid = require("uuid");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(__dirname + "./public/notes.html")
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "./public/index.html")
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
  
    const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    notes.push(newNote);
  
    fs.writeFileSync('db.json', JSON.stringify(notes));
  
    res.json(newNote);
});
  
  app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    let notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    notes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync('db.json', JSON.stringify(notes));
  
    res.json({ success: true });
});
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
