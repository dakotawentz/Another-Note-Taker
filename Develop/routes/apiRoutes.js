const db = require("../db/db.json");
const fs = require("fs")
// const uuid = require("uuid");
const router = require("express").Router();
const express = require("express");

let id = db.length +1;

// New notes added to the request body and adds them to the db.json, then returns the new notes to the client to view
    router.post("/notes", (req, res) => {
        console.log("POST /notes:", req.body);
        req.body.id = id++;
		console.log(req.body);

		db.push(req.body);
		// this request is coming from server.js so only need ./ local
		fs.writeFile("./db/db.json", JSON.stringify(db), function (err) {
			if (err) throw err;
			// pushed into db but need to show on screen
			res.json(db);
		})
});

router.get('/notes', function (req, res) {
  fs.readFile("db/db.json", "utf-8", (err, data) => {
    console.log(data);
      const parsedNotes = JSON.parse(data);
     
    res.json(JSON.parse(data));
    
  // }}
  })});
  

//DELETE NOTES FUNCTION
router.delete("/notes/:id", (req, res) => {
  console.log("DELETE /notes/:id", req.params.id);
  let data = fs.readFile("db/db.json");
  const dataJSON = JSON.parse(data);
  const newNotes = dataJSON.filter((note) => {
    return note.id !== req.params.id;
  });
  fs.writeFile("db/db.json", JSON.stringify(newNotes))
  res.json("Note successfuly deleted!");
});

module.exports = router;