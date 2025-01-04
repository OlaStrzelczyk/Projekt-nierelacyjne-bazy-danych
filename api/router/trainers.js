const express = require("express"); 

const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const TrainerController = require("../controllers/trainers");

router.get("/", TrainerController.trainers_get_all);

router.post("/", checkAuth, TrainerController.trainers_add_new);

router.get("/:trainerId", TrainerController.trainers_get_by_id);

router.put("/:trainerId", checkAuth, TrainerController.trainers_update);

router.patch('/:trainerId', TrainerController.trainers_patch); 

router.delete("/:trainerId", checkAuth, TrainerController.trainers_delete);

router.head("/:trainerId", checkAuth, TrainerController.trainers_head);

router.options('/:trainerId', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send(); 
});

router.options('/:trainerId', TrainerController.handleOptions);


module.exports = router;
