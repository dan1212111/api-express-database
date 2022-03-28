const express = require("express")
const db = require("../utils/database")
const petsRouter = express.Router()

/* GET PETS BY ID */
petsRouter.get("/:id", (req, res) => {
  const selectSinglePetQuery = "SELECT * FROM pets WHERE id = $1"
  const queryValues = [req.params.id]
  db.query(selectSinglePetQuery, queryValues)
    .then(function (databaseResult) {
      if (databaseResult.rowCount === 0) {
        res.status(404).sendres.json({ error: "pet does not exist" })
      } else {
        res.json({ pet: databaseResult.rows[0] })
      }
    })
    .catch((error) => {
      res.status(500)
      res.json({ error: "unexpected error" })
      console.log(error)
    })
})

/* POST PETS */
petsRouter.post("/", (req, res) => {
  const insertPetQuery = `
    INSERT INTO books(
        id,
        name,
        age,
        type,
        breed,
        microchip)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`

  const petValues = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    req.body.publicationDate,
    req.body.pages,
  ]

  db.query(insertPetQuery, petValues)
    .then((databaseResult) => {
      console.log(databaseResult)
      res.json({ pet: databaseResult.rows[0] })
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: "unexpected error" })
    })
})

/* PUT PETS */
petsRouter.put("/:petId", (req, res) => {
  const updatePetsQuery = `
    UPDATE pets SET
    name = $1,
    age = $2,
    type = $3,
    breed = $4,
    microchip = $5
    WHERE id = $7
    RETURNING *`

  const updateValues = [
    req.body.name,
    req.body.age,
    req.body.type,
    req.body.breed,
    req.body.microchip,
    req.body.bookId,
  ]

  db.query(updatePetsQuery, updateValues)
    .then((databaseResult) => {
      console.log(databaseResult)
      if (databaseResult.rowCount === 0) {
        res.status(404)
        res.json({ error: "pet does not exist" })
      } else {
        res.json({ pet: databaseResult.rows[0] })
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(500)
      res.json({ error: "unexpected error" })
    })
})

/* DELETE PETS */
petsRouter.delete("/:petId", (req, res) => {
    const deletePetsQuery = `DELETE FROM pets WHERE id = $1 RETURNING *`

    const deleteValues = [
        req.params.petId
    ] 

    db.query(deletePetsQuery, deleteValues) 
        .then((databaseResult) => {
            if(databaseResult.rowCount === 0) {
                res.json({error: "pet does not exist"})
            } else {
                res.json({pet: databaseResult.rows[0]})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500)
            res.json({ error: "unexpected error"})
        })
})

/* PATCH PETS */
petsRouter.patch("/:id", (req, res) => {
    const petId = parseInt(req.params.id)

    const existingPet = data.pets.find((pet) => pet.id === petId)
    if(!existingPet) {
        res.status(404)
        res.json({error: 'pet does not exist'})
        return 
    }

    if(!req.body.name) {
        res.status(400)
        res.json({error: 'name not specified'})
    }

    existingPet.name = req.body.name
    res.json({ pet: existingPet })
})

module.exports = petsRouter
