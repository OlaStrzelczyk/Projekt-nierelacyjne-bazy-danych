const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const SchoolController = require("../controllers/schools");

router.get("/", SchoolController.schools_get_all);

router.post("/", checkAuth, SchoolController.schools_add_new);

router.get("/:schoolId", SchoolController.schools_get_by_id);

router.put("/:schoolId", checkAuth, SchoolController.schools_update);

router.patch('/:schoolId', SchoolController.schools_patch); 

router.delete("/:schoolId", checkAuth, SchoolController.schools_delete);

router.head("/:schoolId", checkAuth, SchoolController.schools_head);

router.options('/:schoolId', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send();
});

router.options('/:schoolId', SchoolController.handleOptions);


module.exports = router;
