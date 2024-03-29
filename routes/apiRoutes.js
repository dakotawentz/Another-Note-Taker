const db = require("../db/db.json");
const fs = require("fs")
const router = require("express").Router();
const express = require("express");

let id = db.length +1;

// New notes added to the request body and adds them to the db.json, then returns the new notes to the client to view
router.post("/notes", (req, res) => {
    console.log("POST /notes:", req.body);
    req.body.id = id++;
console.log(req.body);

db.push(req.body);
fs.writeFile("db/db.json", JSON.stringify(db), function (err) {
  if (err) throw err;

  res.json(db);
  })
});


router.get('/notes', function (req, res) {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    console.log(data);
    if (err) throw err;
    const parsedNotes = JSON.parse(data);
     
    res.json(JSON.parse(data));
  })
});
  

//DELETE NOTES FUNCTION
router.delete("/notes/:id", (req, res) => {
  console.log("DELETE /notes/:id", req.params.id);
  let data = fs.readFileSync("db/db.json");
  const dataJSON = JSON.parse(data);
  const newNotes = dataJSON.filter((note) => {
    return note.id != req.params.id;
  });
  fs.writeFileSync("db/db.json", JSON.stringify(newNotes))
  res.json("Note successfuly deleted!");
});

module.exports = router;