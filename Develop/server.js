const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const notes = require('./db/db.json');
const uuid = require('uuid');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
const writeFromFile = util.promisify(fs.writeFile);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('./notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});


// New notes added to the request body and adds them to the db.json, then returns the new notes to the client to view
app.post('/api/notes', async (req, res) => {
    let db = await readFromFile('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    }
    
    notes.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json(newNote);
});
  

//DELETE NOTES FUNCTION
app.delete('/api/notes/:id', async (req, res) => {
  let db = JSON.parse(await readFromFile('db/db.json'));
  let deleteNotes = db.filter(item => item.id !== req.params.id);
  await writeFile('db/db.json', JSON.stringify(deleteNotes));
  res.json(deleteNotes);

});
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
