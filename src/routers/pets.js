const express = require('express')
const db = require('../utils/database')
const petsRouter = express.Router()


/* GET PETS BY ID */
petsRouter.get('/:id', (req, res) => {
    const selectSinglePetQuery = "SELECT * FROM pets WHERE id = $1"
    const queryValues = [req.params.id]
    db.query(selectSinglePetQuery, queryValues)
    .then(function(databaseResult) {
        if(databaseResult.rowCount=== 0) {
            res.status(404).sendres.json({error: 'pet does not exist'})
        } else {
            res.json({pet: databaseResult.rows[0]})
        }
    })
    .catch(error => {
        res.status(500)
        res.json({error: 'unexpected error'})
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
        req.body.pages
        ]
    
    db.query(insertPetQuery, petValues)
    .then(databaseResult => {
        console.log(databaseResult)
        res.json({pet: databaseResult.rows[0]})
    })
    .catch(error => {
        console.log(error)
        res.status(500)
        res.json({error:"unexpected error"})
    })
})






module.exports = petsRouter