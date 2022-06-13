const express = require('express')
const PetController = require("../controllers/Pet.controller");

const router = express.Router();

router.get("/", PetController.getAllPets);
router.get("/:id", PetController.getOnePet);

router.post("/new", PetController.createPet);

router.put("/:id", PetController.updatePet);
router.put("/:id/incrementLikes", PetController.incrementPetLikes);

router.delete("/:id", PetController.deletePet);

module.exports = router;