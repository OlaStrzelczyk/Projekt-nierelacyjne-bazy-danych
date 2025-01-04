const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const ClassController = require("../controllers/classes");

router.get("/", ClassController.classes_get_all);

router.post("/", checkAuth, ClassController.classes_add_new);

router.get("/:classId", ClassController.classes_get_by_id);

router.put("/:classId", checkAuth, ClassController.classes_update);

router.patch('/:classId', ClassController.classes_patch); 

router.delete("/:classId", checkAuth, ClassController.classes_delete);

router.head("/:classId", checkAuth, ClassController.classes_head);

router.options('/:classId', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send(); 
});

router.options('/:classId', ClassController.handleOptions);

module.exports = router
